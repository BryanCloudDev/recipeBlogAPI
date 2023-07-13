import { type IRecipeRequest } from '../'
import { type User, type Recipe } from '../../models'

export interface IRecipeService {
  createRecipeInstanceService: (recipeRequest: IRecipeRequest) => Recipe
  createRecipeService: (recipe: Recipe, user: User) => Promise<void>
  deleteRecipebyIdService: (id: number) => Promise<void>
  getAllRecipesService: () => Promise<Recipe[]>
  getRecipebyIdService: (id: number) => Promise<Recipe | null>
  getRecipesBySearchService: (search: string) => Promise<Recipe[]>
  updateRecipeByIdService: (id: number, recipe: IRecipeRequest) => Promise<void>
}
