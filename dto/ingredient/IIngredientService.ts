import { type IIngredientRequest } from '..'
import { type Recipe, type Ingredient } from '../../models'

export interface IIngredientService {
  createIngredientInstanceService: (ingredientRequest: IIngredientRequest) => Ingredient
  createIngredientService: (ingredient: Ingredient, recipe: Recipe) => Promise<void>
  updateIngredientService: (ingredient: IIngredientRequest) => Promise<void>
}
