import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthInput } from './auth.input';
import { AuthResponse } from './auth.interface';
import type { IGQLContext } from 'src/app.interface';

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
}
