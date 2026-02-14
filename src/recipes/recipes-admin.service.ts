import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RecipeInput } from './inputs/recipe.input';

@Injectable()
export class RecipesAdminService {
  constructor(private readonly prisma: PrismaService) {}

  getAll() {
    return this.prisma.recipe.findMany();
  }

  async getById(id: string) {
    const recipe = await this.prisma.recipe.findUnique({
      where: { id },
      include: {
        steps: true,
        ingredients: true,
      },
    });

    if (!recipe) {
      throw new NotFoundException(`Recipe with ID ${id} not found`);
    }

    return recipe;
  }

  async deleteById(id: string) {
    try {
      const recipe = await this.prisma.recipe.delete({ where: { id } });
      return recipe;
    } catch {
      throw new NotFoundException(`Recipe with ID ${id} not found`);
    }
  }

  create(userId: string, data: RecipeInput) {
    const { steps, nutritionFact, ingredients, tags, ...rest } = data;

    return this.prisma.recipe.create({
      data: {
        ...rest,
        user: {
          connect: {
            id: userId,
          },
        },
        nutritionFact: {
          create: nutritionFact,
        },
        ...(!!ingredients?.length && {
          ingredients: {
            create: ingredients.map((ingredient, index) => ({
              ingredientId: ingredient.ingredientId,
              quantity: ingredient.quantity,
              unit: ingredient.unit,
              order: index + 1,
            })),
          },
        }),
        steps: {
          create: steps,
        },
        ...(!!tags?.length && {
          tags: {
            connectOrCreate: tags.map((tag) => ({
              where: { name: tag },
              create: { name: tag },
            })),
          },
        }),
      },
    });
  }

  update(id: string, data: RecipeInput) {
    const { steps, nutritionFact, ingredients, tags, ...rest } = data;

    return this.prisma.recipe.update({
      where: { id },
      data: {
        ...rest,
        ...(nutritionFact && {
          nutritionFact: {
            upsert: { create: nutritionFact, update: nutritionFact },
          },
        }),
        ...(steps && {
          steps: {
            deleteMany: {},
            create: steps.map((step) => ({
              ...step,
            })),
          },
        }),
        ...(!!ingredients?.length && {
          ingredients: {
            deleteMany: {},
            create: ingredients.map((ingredient, index) => ({
              ingredientId: ingredient.ingredientId,
              quantity: ingredient.quantity,
              unit: ingredient.unit,
              order: index + 1,
            })),
          },
        }),
        ...(!!tags?.length && {
          connectOrCreate: tags.map((tag) => ({
            where: { name: tag },
            create: { name: tag },
          })),
        }),
      },
    });
  }
}
