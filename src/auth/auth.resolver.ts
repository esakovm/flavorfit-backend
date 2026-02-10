import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthInput } from './auth.input';
import { AuthResponse } from './auth.interface';
import type { IGQLContext } from 'src/app.interface';
import { BadRequestException } from '@nestjs/common';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => AuthResponse)
  async login(@Args('data') input: AuthInput, @Context() { res }: IGQLContext) {
    const { refreshToken, ...response } = await this.authService.login(input);

    this.authService.toggleRefreshTokenCookie(res, refreshToken);

    return response;
  }

  /* TODO: Captcha */
  @Mutation(() => AuthResponse)
  async register(
    @Args('data') input: AuthInput,
    @Context() { res }: IGQLContext,
  ) {
    const { refreshToken, ...response } = await this.authService.login(input);

    this.authService.toggleRefreshTokenCookie(res, refreshToken);

    return response;
  }

  @Query(() => AuthResponse)
  async newTokens(@Context() { req, res }: IGQLContext) {
    const initialRefreshToken =
      req.cookies?.[this.authService.REFRESH_TOKEN_NAME];

    if (!initialRefreshToken) {
      this.authService.toggleRefreshTokenCookie(res, null);
      throw new BadRequestException('Refresh token is missing');
    }
    const { refreshToken, ...response } =
      await this.authService.getNewTokens(initialRefreshToken);

    this.authService.toggleRefreshTokenCookie(res, refreshToken);

    return response;
  }

  @Mutation(() => Boolean)
  logout(@Context() { res, req }: IGQLContext) {
    const initialRefreshToken =
      req.cookies?.[this.authService.REFRESH_TOKEN_NAME];

    if (!initialRefreshToken) {
      this.authService.toggleRefreshTokenCookie(res, null);
      throw new BadRequestException('Refresh token is missing');
    }

    this.authService.toggleRefreshTokenCookie(res, null);

    return true;
  }
}
