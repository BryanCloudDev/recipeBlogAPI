import { type Repository } from 'typeorm'
import { type Ingredient } from '../../models'

export interface IIngredientRepository {
  ingredient: Repository<Ingredient>
}
