import { type IRecipeController, type IRecipeService, type IRecipeRequest, type ICustomRequest } from '../dto'
import { type Response, type Request } from 'express'
import { type User } from '../models'
import { LoggerService, RecipeService } from '../services'
import { matchedData } from 'express-validator'

export class RecipeController implements IRecipeController {
  constructor(private readonly recipeService: IRecipeService = new RecipeService()) {}

  public createRecipe = async (req: Request, res: Response): Promise<Response> => {
    try {
      const user = req.user as User

      const recipeRequest: IRecipeRequest = req.body
      const recipeInstance = this.recipeService.createRecipeInstanceService(recipeRequest)
      await this.recipeService.createRecipeService(recipeInstance, user)

      return res.status(201).json({
        message: 'Succesfully created'
      })
    } catch (error: any) {
      const { message } = LoggerService.errorMessageHandler(error, 'Error in create recipe controller')

      return res.status(500).json({ message })
    }
  }

  public deleteRecipeById = async (req: Request, res: Response): Promise<Response> => {
    try {
      const id = parseInt(req.params.id)
      await this.recipeService.deleteRecipebyIdService(id)

      return res.status(204).json()
    } catch (error: any) {
      const { message } = LoggerService.errorMessageHandler(error, 'Error in delete recipe by id controller')

      return res.status(500).json({ message })
    }
  }

  public getAllRecipes = async (req: Request, res: Response): Promise<Response> => {
    try {
      const recipes = await this.recipeService.getAllRecipesService()

      return res.status(200).json(recipes)
    } catch (error: any) {
      const { message } = LoggerService.errorMessageHandler(error, 'Error in get all recipes controller')

      return res.status(500).json({ message })
    }
  }

  public getRecipeById = async (req: Request, res: Response): Promise<Response> => {
    try {
      const id = parseInt(req.params.id)
      const recipe = await this.recipeService.getRecipebyIdService(id)

      return res.status(200).json(recipe)
    } catch (error) {
      const { message } = LoggerService.errorMessageHandler(error, 'Error in get recipe by id controller')

      return res.status(500).json({ message })
    }
  }

  public getRecipesByText = async (req: Request, res: Response): Promise<Response> => {
    try {
      const data = matchedData(req)
      const { search } = data

      const recipes = await this.recipeService.getRecipesBySearchService(search)
      return res.status(200).json(recipes)
    } catch (error) {
      const { message } = LoggerService.errorMessageHandler(error, 'Error in get recipes by search controller')

      return res.status(500).json({ message })
    }
  }

  public updateRecipeById = async (req: ICustomRequest, res: Response): Promise<Response> => {
    try {
      const recipe = req.recipe
      const recipeRequest: IRecipeRequest = req.body

      await this.recipeService.updateRecipeByIdService(recipe.id, recipeRequest)

      return res.status(204).json({})
    } catch (error) {
      const { message } = LoggerService.errorMessageHandler(error, 'Error in update recipe by id controller')

      return res.status(500).json({ message })
    }
  }
}
