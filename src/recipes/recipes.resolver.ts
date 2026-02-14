import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Role } from 'prisma/generated/prisma/enums';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { RecipeInput } from './inputs/recipe.input';
import { RecipesQueryInput } from './inputs/recipes-query.input';
import { RecipeModel } from './models/recipe.model';
import { RecipesAdminService } from './recipes-admin.service';
import { RecipesService } from './recipes.service';

@Resolver()
export class RecipesResolver {
  constructor(
    private readonly recipesService: RecipesService,
    private readonly recipesAdminService: RecipesAdminService,
  ) {}

  @Query(() => [RecipeModel], { name: 'recipes' })
  @Auth(Role.ADMIN)
  getAll(@Args('input') input: RecipesQueryInput) {
    return this.recipesService.getAll(input);
  }

  @Query(() => RecipeModel, { name: 'recipeById' })
  @Auth(Role.ADMIN)
  getById(@Args('id') id: string) {
    return this.recipesAdminService.getById(id);
  }

  @Mutation(() => RecipeModel, { name: 'createRecipe' })
  @Auth(Role.ADMIN)
  create(@CurrentUser('id') id: string, @Args('input') input: RecipeInput) {
    return this.recipesAdminService.create(id, input);
  }

  @Mutation(() => RecipeModel, { name: 'updateRecipe' })
  @Auth(Role.ADMIN)
  update(@Args('id') id: string, @Args('input') input: RecipeInput) {
    return this.recipesAdminService.update(id, input);
  }

  @Mutation(() => RecipeModel, { name: 'deleteRecipe' })
  @Auth(Role.ADMIN)
  deleteById(@Args('id') id: string) {
    return this.recipesAdminService.deleteById(id);
  }
}
