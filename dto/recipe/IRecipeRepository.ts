import { type Recipe } from '../../models'
import { type Repository } from 'typeorm'

export interface IRecipeRepository {
  recipe: Repository<Recipe>
}
