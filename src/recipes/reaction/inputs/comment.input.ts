import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CommentCreateInput {
  @Field(() => String)
  text: string;

  @Field(() => String)
  recipeId: string;
}

@InputType()
export class CommentUpdateInput {
  @Field(() => String)
  text: string;
}
