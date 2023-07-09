import { type IIngredientService, type IIngredientRequest, type IIngredientRepository } from '../dto'
import { type Ingredient, type Recipe } from '../models'
import { IngredientRepository } from '../repositories'

export class IngredientService implements IIngredientService {
  constructor(readonly repository: IIngredientRepository = new IngredientRepository()) {}

  createIngredientInstanceService = (ingredientRequest: IIngredientRequest): Ingredient => {
    return this.repository.ingredient.create({ ...ingredientRequest })
  }

  createIngredientService = async (ingredient: Ingredient, recipe: Recipe): Promise<void> => {
    await this.repository.ingredient.save({ ...ingredient, recipe })
  }
}
