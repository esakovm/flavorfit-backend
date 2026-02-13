import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Unit } from 'prisma/generated/graphql/prisma';

@ObjectType()
export class IngredientModel {
  @Field(() => ID, { nullable: false })
  id!: string;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => Unit, { nullable: false })
  unit!: `${Unit}`;

  @Field(() => String, { nullable: false })
  price!: string;

  @Field(() => Date, { nullable: false })
  createdAt!: Date;

  @Field(() => Date, { nullable: false })
  updatedAt!: Date;
}
