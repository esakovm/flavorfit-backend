import { Field, Float, ID, ObjectType } from '@nestjs/graphql';
import { Unit } from '../enums/unit.enum';
import { IngredientModel } from '../ingredients/models/ingredient.model';

@ObjectType()
export class RecipeIngredientModel {
  @Field(() => ID, { nullable: false })
  id!: string;

  @Field(() => Float, { nullable: false })
  quantity!: number;

  @Field(() => Unit, { nullable: false })
  unit!: `${Unit}`;

  @Field(() => Date, { nullable: false })
  createdAt!: Date;

  @Field(() => Date, { nullable: false })
  updatedAt!: Date;

  @Field(() => IngredientModel, { nullable: false })
  ingredient?: IngredientModel;
}
