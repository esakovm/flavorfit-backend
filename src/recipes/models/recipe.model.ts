import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { User } from 'prisma/generated/graphql/user';
import { Difficulty } from '../enums/difficulty.enum';
import { NutritionFactModel } from './nutrition-fact.model';
import { RecipeIngredientModel } from './recipe-ingredient.model';
import { RecipeStepModel } from './recipe-step.model';
import { RecipeTagsModel } from './recipe-tag.model';

@ObjectType()
export class RecipeModel {
  @Field(() => ID, { nullable: false })
  id!: string;

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

  @Field(() => String, { nullable: false })
  userId!: string;

  @Field(() => Date, { nullable: false })
  createdAt!: Date;

  @Field(() => Date, { nullable: false })
  updatedAt!: Date;

  @Field(() => User, { nullable: false })
  user?: User;

  @Field(() => NutritionFactModel, { nullable: true })
  nutritionFact?: NutritionFactModel | null;

  @Field(() => [RecipeTagsModel], { nullable: true })
  tags?: Array<RecipeTagsModel>;

  @Field(() => [RecipeStepModel], { nullable: true })
  steps?: Array<RecipeStepModel>;

  @Field(() => [RecipeIngredientModel], { nullable: true })
  ingredients?: Array<RecipeIngredientModel>;

  @Field(() => Int, { nullable: true })
  likes?: number;
}
