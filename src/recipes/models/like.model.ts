import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { User } from 'prisma/generated/graphql/user';

@ObjectType()
export class Like {
  @Field(() => ID, { nullable: false })
  id!: string;

  @Field(() => Int, { nullable: false })
  count!: number;

  @Field(() => Date, { nullable: false })
  createdAt!: Date;

  @Field(() => Date, { nullable: false })
  updatedAt!: Date;

  @Field(() => User, { nullable: false })
  user?: User;
}
