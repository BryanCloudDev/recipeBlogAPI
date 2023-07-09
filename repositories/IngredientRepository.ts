import { type Ingredient } from '../models'
import { type Repository } from 'typeorm'
import { ingredientRepository } from './repositories'
import type IIngredientRepository from '../dto/recipe/ingredient/IIngredientRepository'

export default class IngredientRepository implements IIngredientRepository {
  constructor(readonly ingredient: Repository<Ingredient> = ingredientRepository) {}
}
