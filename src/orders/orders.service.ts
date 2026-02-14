import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { OrderStatus } from './enums/order-status.enum';
import { OrderCreateInput } from './inputs/order.input';

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  getAllByUser(userId: string) {
    return this.prisma.order.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      include: {
        items: {
          include: {
            ingredient: true,
            recipe: true,
          },
        },
      },
    });
  }

  async create(userId: string, input: OrderCreateInput) {
    if (!input.items?.length) {
      throw new BadRequestException('Order must contain at least one item');
    }

    const generatedOrderId = Math.random()
      .toString(36)
      .substring(2, 8)
      .toUpperCase();

    const ingredientsIds = input.items.map((item) => item.ingredientId);

    const ingredients = await this.prisma.ingredient.findMany({
      where: {
        id: { in: ingredientsIds },
      },
    });

    const ingredientMap = new Map(
      ingredients.map((ingredient) => [ingredient.id, ingredient]),
    );

    let total = 0;
    const orderItemsWithPrice = input.items.map((item) => {
      const ingredient = ingredientMap.get(item.ingredientId);

      if (!ingredient) {
        throw new NotFoundException(
          `Ingredient with ID ${item.ingredientId} not found`,
        );
      }

      const ingredientTotalPrice =
        Number(ingredient.price || 0) * item.quantity;

      total += ingredientTotalPrice;

      return {
        ingredientId: item.ingredientId,
        quantity: item.quantity,
        price: ingredientTotalPrice,
      };
    });

    return this.prisma.order.create({
      data: {
        orderId: generatedOrderId,
        userId,
        status: OrderStatus.PENDING,
        total,
        items: {
          create: orderItemsWithPrice,
        },
      },
      include: {
        items: {
          include: {
            ingredient: true,
          },
        },
      },
    });
  }
}
