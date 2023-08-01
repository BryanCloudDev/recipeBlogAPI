import { type IFilter, type IFileService, type IRecipeRequest, type IGetAllItemsResult } from '../'
import { type User, type Recipe } from '../../models'

export interface IRecipeService {
  createRecipeInstanceService: (recipeRequest: IRecipeRequest) => Recipe
  createRecipeService: (recipe: Recipe, user: User) => Promise<number>
  getAllRecipesService: (filter?: IFilter<Recipe>) => Promise<IGetAllItemsResult<Recipe>>
  getRecipebyIdService: (id: number) => Promise<Recipe | null>
  getRecipesBySearchService: (search: string) => Promise<Recipe[]>
  updateRecipeByIdService: (id: number, recipe: Partial<IRecipeRequest>) => Promise<void>
  fileService: IFileService
}
