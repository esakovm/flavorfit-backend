import { Field, InputType } from '@nestjs/graphql';
import { BodyMeasurementsUpdateWithoutUserInput } from 'prisma/generated/graphql/body-measurements';
import { ProfileUpdateWithoutUserInput } from 'prisma/generated/graphql/profile';

@InputType()
export class UserUpdateInput {
  @Field(() => String, { nullable: true })
  email?: string;

  @Field(() => String, { nullable: true })
  password?: string;

  @Field(() => ProfileUpdateWithoutUserInput, { nullable: true })
  profile?: ProfileUpdateWithoutUserInput;

  @Field(() => BodyMeasurementsUpdateWithoutUserInput, {
    nullable: true,
  })
  measurements?: BodyMeasurementsUpdateWithoutUserInput;
}
