import { type IIngredientRequest } from '../../'
import { type Recipe, type Ingredient } from '../../../models'

export default interface IIngredientService {
  createIngredientInstanceService: (ingredientRequest: IIngredientRequest) => Ingredient
  createIngredientService: (ingredient: Ingredient, recipe: Recipe) => Promise<void>
}
