import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { IngredientCreateInput } from './inputs/create-ingredient.input';
import { IngredientUpdateInput } from './inputs/update-ingredient.input';

@Injectable()
export class IngredientsService {
  constructor(private readonly prisma: PrismaService) {}

  getAll() {
    return this.prisma.ingredient.findMany();
  }

  async getById(id: string) {
    const ingredient = await this.prisma.ingredient.findUnique({
      where: { id },
    });

    if (!ingredient) {
      throw new NotFoundException(`Ingredient with ID ${id} not found`);
    }

    return ingredient;
  }

  async deleteById(id: string) {
    try {
      const ingredient = await this.prisma.ingredient.delete({ where: { id } });
      return ingredient;
    } catch {
      throw new NotFoundException(`Ingredient with ID ${id} not found`);
    }
  }

  create(data: IngredientCreateInput) {
    return this.prisma.ingredient.create({ data });
  }

  update(id: string, data: IngredientUpdateInput) {
    return this.prisma.ingredient.update({ where: { id }, data });
  }
}
