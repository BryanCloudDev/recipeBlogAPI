import { type Repository } from 'typeorm'
import { type Ingredient } from '../../../models'

export default interface IIngredientRepository {
  ingredient: Repository<Ingredient>
}
