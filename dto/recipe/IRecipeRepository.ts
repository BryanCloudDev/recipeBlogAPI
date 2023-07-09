import { type Recipe } from '../../models'
import { type Repository } from 'typeorm'

export default interface IRecipeRepository {
  recipe: Repository<Recipe>
}
