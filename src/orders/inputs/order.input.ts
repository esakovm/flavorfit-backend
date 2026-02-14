import { Field, Float, ID, InputType } from '@nestjs/graphql';
import { OrderStatus } from '../enums/order-status.enum';

@InputType()
export class OrderItemInput {
  @Field(() => ID, { nullable: false })
  ingredientId: string;

  @Field(() => Float, { nullable: false })
  quantity: number;
}

@InputType()
export class OrderCreateInput {
  @Field(() => [OrderItemInput])
  items: OrderItemInput[];
}

@InputType()
export class OrderUpdateStatus {
  @Field(() => OrderStatus)
  status: `${OrderStatus}`;
}
