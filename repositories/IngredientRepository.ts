import { type IIngredientRepository } from '../dto'
import { type Ingredient } from '../models'
import { type Repository } from 'typeorm'
import { ingredientRepository } from './repositories'

export class IngredientRepository implements IIngredientRepository {
  constructor(readonly ingredient: Repository<Ingredient> = ingredientRepository) {}
}
