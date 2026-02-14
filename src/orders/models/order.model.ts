import { Field, ID, ObjectType } from '@nestjs/graphql';
import { OrderStatus } from '../enums/order-status.enum';
import { OrderItemModel } from './order-item.model';

@ObjectType()
export class OrderModel {
  @Field(() => ID, { nullable: false })
  id!: string;

  @Field(() => String, { nullable: false })
  orderId!: string;

  @Field(() => OrderStatus, { defaultValue: 'PENDING', nullable: false })
  status!: `${OrderStatus}`;

  @Field(() => Date, { nullable: false })
  createdAt!: Date;

  @Field(() => Date, { nullable: false })
  updatedAt!: Date;

  @Field(() => [OrderItemModel], { nullable: false })
  items?: OrderItemModel[];
}
