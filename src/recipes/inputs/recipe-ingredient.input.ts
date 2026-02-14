import { Field, ID, InputType } from '@nestjs/graphql';
import { Unit } from '../enums/unit.enum';

@InputType()
export class RecipeIngredientInput {
  @Field(() => ID)
  ingredientId: string;

  @Field(() => Number)
  quantity: number;

  @Field(() => Unit)
  unit: `${Unit}`;
}
