import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthInput } from './auth.input';
import { AuthResponse } from './auth.interface';

@Resolver()
export class AuthResolver {
  constructor(private auth: AuthService) {}

  /* TODO: Captcha */
  @Mutation(() => AuthResponse)
  async register(@Args('data') input: AuthInput) {
    /* TODO: Add cookie */
    return this.auth.register(input);
  }
}
