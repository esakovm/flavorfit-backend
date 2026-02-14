import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { OrderCreateInput } from './inputs/order.input';
import { OrderModel } from './models/order.model';
import { OrdersService } from './orders.service';

@Resolver()
export class OrdersResolver {
  constructor(private readonly ordersService: OrdersService) {}

  @Query(() => [OrderModel], { name: 'orders' })
  @Auth()
  getUserOrder(@CurrentUser('id') userId: string) {
    return this.ordersService.getAllByUser(userId);
  }

  @Mutation(() => OrderModel, { name: 'createOrder' })
  @Auth()
  create(
    @CurrentUser('id') userId: string,
    @Args('input') input: OrderCreateInput,
  ) {
    return this.ordersService.create(userId, input);
  }
}
