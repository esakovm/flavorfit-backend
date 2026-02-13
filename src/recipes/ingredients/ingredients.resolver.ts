import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { IngredientsService } from './ingredients.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { IngredientModel } from './models/ingredient.model';
import { Role } from 'prisma/generated/prisma/enums';
import { IngredientCreateInput } from './inputs/create-ingredient.input';
import { IngredientUpdateInput } from './inputs/update-ingredient.input';

@Resolver()
export class IngredientsResolver {
  constructor(private readonly ingredientsService: IngredientsService) {}

  @Query(() => [IngredientModel], { name: 'ingredients' })
  @Auth(Role.ADMIN)
  getAll() {
    return this.ingredientsService.getAll();
  }

  @Query(() => IngredientModel, { name: 'ingredientById' })
  @Auth(Role.ADMIN)
  getById(@Args('id') id: string) {
    return this.ingredientsService.getById(id);
  }

  @Mutation(() => IngredientModel, { name: 'createIngredient' })
  @Auth(Role.ADMIN)
  create(@Args('input') input: IngredientCreateInput) {
    return this.ingredientsService.create(input);
  }

  @Mutation(() => IngredientModel, { name: 'updateIngredient' })
  @Auth(Role.ADMIN)
  update(@Args('id') id: string, @Args('input') input: IngredientUpdateInput) {
    return this.ingredientsService.update(id, input);
  }

  @Mutation(() => IngredientModel, { name: 'deleteIngredient' })
  @Auth(Role.ADMIN)
  deleteById(@Args('id') id: string) {
    return this.ingredientsService.deleteById(id);
  }
}
