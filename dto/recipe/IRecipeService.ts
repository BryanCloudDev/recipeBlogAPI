import { type IRecipeRequest } from '../'
import { type QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity'
import { type Recipe } from '../../models'

export interface IRecipeService {
  createRecipeInstanceService: (recipeRequest: IRecipeRequest) => Recipe
  createRecipeService: (recipe: Recipe) => Promise<void>
  deleteRecipebyIdService: (id: number) => Promise<void>
  getAllRecipesService: () => Promise<Recipe[]>
  getRecipebyIdService: (id: number) => Promise<Recipe | null>
  getRecipesBySearchService: (search: string) => Promise<Recipe[]>
  updateRecipeByIdService: (id: number, recipe: QueryDeepPartialEntity<Recipe>) => Promise<void>
}
