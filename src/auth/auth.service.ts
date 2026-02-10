import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthInput } from './auth.input';
import { hash, verify } from 'argon2';
import { IAuthTokenData } from './auth.interface';
import { UsersService } from 'src/users/users.service';
import { Response } from 'express';
import { isDevMode } from 'src/utils/is-dev.util';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  private EXPIRE_DAY_REFRESH_TOKEN = 3;
  REFRESH_TOKEN_NAME = 'refreshToken';

  async register(input: AuthInput) {
    try {
      const email = input.email.toLocaleLowerCase();
      const existingUser = await this.usersService.findByEmail(email);
      if (existingUser) {
        throw new BadRequestException('User with this email already exist');
      }

      /* TODO: Move to user service */
      const user = await this.prisma.user.create({
        data: {
          email,
          password: await hash(input.password),
        },
      });

      const tokens = this.generateTokens({ id: user.id, role: user.role });

      return { user, ...tokens };
    } catch (error) {
      throw new BadRequestException(`Registration failed: ${error}`);
    }
  }

  async login(input: AuthInput) {
    const user = await this.validateUser(input);

    const tokens = this.generateTokens({ id: user.id, role: user.role });

    return { user, ...tokens };
  }

  async getNewTokens(refreshToken: string) {
    const result =
      await this.jwtService.verifyAsync<Pick<IAuthTokenData, 'id'>>(
        refreshToken,
      );
    if (!result) {
      throw new BadRequestException('Invalid refresh token');
    }

    const user = await this.usersService.findById(result.id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const tokens = this.generateTokens({ id: user.id, role: user.role });

    return {
      user,
      ...tokens,
    };
  }

  private async validateUser(input: AuthInput) {
    const user = await this.usersService.findByEmail(input.email);

    if (!user) {
      throw new NotFoundException('Invalid email or password');
    }

    const isPasswordValid = await verify(user.password, input.password);
    if (!isPasswordValid) {
      throw new NotFoundException('Invalid email or password');
    }

    return user;
  }

  private generateTokens(data: IAuthTokenData) {
    const accessToken = this.jwtService.sign(data, {
      expiresIn: '1h',
    });

    const refreshToken = this.jwtService.sign(
      { id: data.id },
      {
        expiresIn: `${this.EXPIRE_DAY_REFRESH_TOKEN}d`,
      },
    );

    return { accessToken, refreshToken };
  }

  toggleRefreshTokenCookie(response: Response, token: string | null) {
    const expiresIn = new Date(
      token
        ? Date.now() + this.EXPIRE_DAY_REFRESH_TOKEN * 24 * 60 * 60 * 1000
        : 0,
    );

    response.cookie(this.REFRESH_TOKEN_NAME, token || '', {
      httpOnly: true,
      domain: this.configService.get<string>('DOMAIN'),
      expires: expiresIn,
      sameSite: isDevMode(this.configService) ? 'none' : 'strict',
      secure: true,
    });
  }
}
