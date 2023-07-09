import { type IRecipeRepository } from '../dto'
import { type Recipe } from '../models'
import { type Repository } from 'typeorm'
import { recipeRepository } from './repositories'

export class RecipeRepository implements IRecipeRepository {
  constructor(readonly recipe: Repository<Recipe> = recipeRepository) {}
}
