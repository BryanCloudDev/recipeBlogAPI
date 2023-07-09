import { type Recipe } from '../models'
import { type Repository } from 'typeorm'
import { recipeRepository } from '.'

export default class RecipeRepository {
  constructor(readonly recipe: Repository<Recipe> = recipeRepository) {}
}
