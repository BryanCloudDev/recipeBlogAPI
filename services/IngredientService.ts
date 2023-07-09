import { type IIngredientRequest, type IIngredientService } from '../dto'
import type IIngredientRepository from '../dto/recipe/ingredient/IIngredientRepository'
import { type Recipe, type Ingredient } from '../models'
import IngredientRepository from '../repositories/IngredientRepository'

export default class IngredientService implements IIngredientService {
  constructor(readonly repository: IIngredientRepository = new IngredientRepository()) {}

  createIngredientInstanceService = (ingredientRequest: IIngredientRequest): Ingredient => {
    return this.repository.ingredient.create({ ...ingredientRequest })
  }

  createIngredientService = async (ingredient: Ingredient, recipe: Recipe): Promise<void> => {
    await this.repository.ingredient.save({ ...ingredient, recipe })
  }
}
