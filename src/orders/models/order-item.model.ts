import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { RecipeModel } from 'src/recipes/models/recipe.model';

@ObjectType()
export class OrderItemModel {
  @Field(() => ID, { nullable: false })
  id!: string;

  @Field(() => String, { nullable: false })
  recipeId!: string;

  @Field(() => String, { nullable: false })
  price!: string;

  @Field(() => Int, { defaultValue: 1, nullable: true })
  quantity!: number | null;

  @Field(() => Date, { nullable: false })
  createdAt!: Date;

  @Field(() => Date, { nullable: false })
  updatedAt!: Date;

  @Field(() => RecipeModel, { nullable: false })
  recipe?: RecipeModel;
}
