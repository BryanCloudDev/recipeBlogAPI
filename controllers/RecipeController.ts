import { type IRecipeController, type IRecipeService, type IRecipeRequest } from '../dto'
import { type Response, type Request } from 'express'
import { RecipeService } from '../services'

export class RecipeController implements IRecipeController {
  constructor(private readonly recipeService: IRecipeService = new RecipeService()) {}

  public createRecipe = async (req: Request, res: Response): Promise<Response> => {
    try {
      const recipeRequest: IRecipeRequest = req.body
      const recipeInstance = this.recipeService.createRecipeInstanceService(recipeRequest)
      await this.recipeService.createRecipeService(recipeInstance)

      return res.status(201).json({
        message: 'Succesfully created'
      })
    } catch (error) {
      return res.status(500).json({
        message: error.message
      })
    }
  }

  public deleteRecipe = async (req: Request, res: Response): Promise<Response> => {
    try {
      const id = parseInt(req.params.id)
      await this.recipeService.deleteRecipebyIdService(id)

      return res.status(204).json()
    } catch (error) {
      return res.status(500).json({
        message: error.message
      })
    }
  }

  public getAllRecipes = async (req: Request, res: Response): Promise<Response> => {
    try {
      const recipes = await this.recipeService.getAllRecipesService()

      return res.status(200).json(recipes)
    } catch (error) {
      return res.status(500).json({
        message: error.message
      })
    }
  }

  public getRecipeById = async (req: Request, res: Response): Promise<Response> => {
    try {
      const id = parseInt(req.params.id)
      const recipe = await this.recipeService.getRecipebyIdService(id)

      return res.status(200).json(recipe)
    } catch (error) {
      return res.status(500).json({
        message: error.message
      })
    }
  }

  public getRecipesByText = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { search } = req.params
      const recipes = await this.recipeService.getRecipesBySearchService(search)
      return res.status(200).json(recipes)
    } catch (error) {
      return res.status(500).json({
        message: error.message
      })
    }
  }
}
