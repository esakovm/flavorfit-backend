import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CommentModel {
  @Field(() => ID, { nullable: false })
  id: string;

  @Field(() => String, { nullable: false })
  text: string;

  @Field(() => Date, { nullable: false })
  createdAt: Date;

  @Field(() => Date, { nullable: false })
  updatedAt: Date;
}
