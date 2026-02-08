import { Query, Resolver } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { UserProfileModel } from './models/user-profile.model';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'prisma/generated/prisma/enums';

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => UserProfileModel, { name: 'profile' })
  @Auth()
  getProfile(@CurrentUser('id') id: string) {
    return this.usersService.findById(id);
  }

  @Query(() => UserProfileModel, { name: 'users' })
  @Auth(Role.ADMIN)
  getUsers() {
    return this.usersService.findAll();
  }
}
