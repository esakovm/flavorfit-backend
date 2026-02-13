import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RecipeStepInput {
  @Field(() => String, { nullable: false })
  order!: number;

  @Field(() => String, { nullable: false })
  title!: string;

  @Field(() => String, { nullable: false })
  description!: string;
}
