import { Field, InputType, Int } from '@nestjs/graphql';
import { Difficulty } from '../enums/difficulty.enum';
import { NutritionFactInput } from './nutrition-fact.input';
import { RecipeIngredientInput } from './recipe-ingredient.input';
import { RecipeStepInput } from './recipe-step.input';

@InputType()
export class RecipeInput {
  @Field(() => String, { nullable: false })
  slug!: string;

  @Field(() => String, { nullable: false })
  title!: string;

  @Field(() => String, { nullable: false })
  description!: string;

  @Field(() => Int, { nullable: false })
  calories!: number;

  @Field(() => Int, { nullable: false })
  time!: number;

  @Field(() => Difficulty, { nullable: false })
  difficulty!: `${Difficulty}`;

  @Field(() => NutritionFactInput, {
    nullable: true,
  })
  nutritionFact?: NutritionFactInput;

  @Field(() => [String], {
    nullable: true,
  })
  tags?: string[];

  @Field(() => [RecipeStepInput], { nullable: true })
  steps?: RecipeStepInput[];

  @Field(() => [RecipeIngredientInput], {
    nullable: true,
  })
  ingredients?: RecipeIngredientInput[];
}
