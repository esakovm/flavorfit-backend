import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Role } from 'prisma/generated/prisma/enums';

export interface IAuthTokenData {
  id: string;
  role: Role;
}

export type TCurrentUser = Omit<UserModel, 'password'>;

export interface IRequestWithUser {
  user?: TCurrentUser;
}

/* TODO: Codegen generate Models for graphql from Prisma to graphql*/

registerEnumType(Role, { name: 'Role' });

@ObjectType()
export class UserModel {
  @Field()
  id: string;

  @Field()
  email: string;

  @Field(() => Role)
  role: Role;
}

@ObjectType()
export class AuthResponse {
  @Field(() => UserModel)
  user: UserModel;

  @Field()
  accessToken: string;
}
