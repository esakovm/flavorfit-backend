import { Module } from '@nestjs/common';
import { IngredientsModule } from './ingredients/ingredients.module';
import { RecipesAdminService } from './recipes-admin.service';
import { RecipesResolver } from './recipes.resolver';
import { RecipesService } from './recipes.service';
import { ReactionModule } from './reaction/reaction.module';

@Module({
  providers: [RecipesResolver, RecipesService, RecipesAdminService],
  imports: [IngredientsModule, ReactionModule],
})
export class RecipesModule {}
