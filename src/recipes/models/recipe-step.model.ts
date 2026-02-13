import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class RecipeStepModel {
  @Field(() => ID, { nullable: false })
  id!: string;

  @Field(() => Int, { nullable: false })
  order: number;

  @Field(() => String, { nullable: false })
  title: string;

  @Field(() => String, { nullable: false })
  description: string;

  @Field(() => Date, { nullable: false })
  createdAt!: Date;

  @Field(() => Date, { nullable: false })
  updatedAt!: Date;
}
