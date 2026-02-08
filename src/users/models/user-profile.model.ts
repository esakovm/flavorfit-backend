import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';

import {
  ActivityLevel,
  Gender,
  NutritionGoal,
  Role,
} from 'prisma/generated/prisma/enums';

registerEnumType(Role, { name: 'Role' });
registerEnumType(Gender, { name: 'Gender' });
registerEnumType(ActivityLevel, { name: 'ActivityLevel' });
registerEnumType(NutritionGoal, { name: 'NutritionGoal' });

@ObjectType()
export class BodyMeasurementModel {
  @Field()
  id: string;

  @Field(() => Int, { nullable: true })
  height: number;

  @Field(() => Int, { nullable: true })
  weight: number;

  @Field(() => Int, { nullable: true })
  weightGoal: number;

  @Field(() => Int, { nullable: true })
  chest: number;

  @Field(() => Int, { nullable: true })
  waist: number;

  @Field(() => Int, { nullable: true })
  thigh: number;

  @Field(() => Int, { nullable: true })
  arm: number;

  @Field(() => ActivityLevel, { nullable: true })
  activityLevel?: ActivityLevel;

  @Field(() => NutritionGoal, { nullable: true })
  nutritionGoal?: NutritionGoal;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

@ObjectType()
export class ProfileModel {
  @Field()
  id: string;

  @Field()
  fullName: string;

  @Field(() => Gender, { nullable: true })
  gender?: Gender;

  @Field(() => Int, { nullable: true })
  age?: number;

  @Field({ nullable: true })
  bio?: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

@ObjectType()
export class UserProfileModel {
  @Field()
  id: string;

  @Field()
  email: string;

  @Field(() => Role)
  role: Role;

  @Field(() => ProfileModel, { nullable: true })
  profile?: ProfileModel;

  @Field(() => BodyMeasurementModel, { nullable: true })
  measurements?: BodyMeasurementModel;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
