import { Field, InputType } from '@nestjs/graphql';
import { Unit } from 'prisma/generated/graphql/prisma';

@InputType()
export class IngredientUpdateInput {
  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => Unit, { nullable: false })
  unit!: `${Unit}`;

  @Field(() => String, { nullable: false })
  price!: string;
}
