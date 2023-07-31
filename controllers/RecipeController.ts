import { type IRecipeController, type IRecipeService, type IRecipeRequest, type ICustomRequest } from '../dto'
import { type Response, type Request } from 'express'
import { type User } from '../models'
import { LoggerService, RecipeService, Routes, Status } from '../services'
import { matchedData } from 'express-validator'

export class RecipeController implements IRecipeController {
  constructor(private readonly recipeService: IRecipeService = new RecipeService()) {}

  public createRecipe = async (req: Request, res: Response): Promise<Response> => {
    try {
      const user = req.user as User

      const recipeRequest: IRecipeRequest = req.body
      const recipeInstance = this.recipeService.createRecipeInstanceService(recipeRequest)
      const id = await this.recipeService.createRecipeService(recipeInstance, user)

      return res.status(201).json({
        message: 'Succesfully created',
        id
      })
    } catch (error: any) {
      const { message } = LoggerService.errorMessageHandler(error, 'Error in create recipe controller')

      return res.status(500).json({ message })
    }
  }

  public deleteRecipeById = async (req: ICustomRequest, res: Response): Promise<Response> => {
    try {
      const { id } = req.recipe
      await this.recipeService.updateRecipeByIdService(id, { status: Status.INACTIVE })

      return res.status(204).json({})
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

  public getRecipeById = async (req: ICustomRequest, res: Response): Promise<Response> => {
    try {
      const recipe = req.recipe
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
      const { id } = req.recipe
      const recipeRequest: IRecipeRequest = req.body
      await this.recipeService.updateRecipeByIdService(id, recipeRequest)

      return res.status(204).json({})
    } catch (error) {
      const { message } = LoggerService.errorMessageHandler(error, 'Error in update recipe by id controller')

      return res.status(500).json({ message })
    }
  }

  public uploadPhoto = async (req: ICustomRequest, res: Response): Promise<Response> => {
    try {
      if (req.file !== undefined) {
        const { id, photo } = req.recipe
        const { filename } = req.file
        this.recipeService.fileService.deleteExistingFile(photo)

        const { path, url } = this.recipeService.fileService.buildURLForFile(Routes.RECIPES, filename)

        await this.recipeService.updateRecipeByIdService(id, { photo: path })

        return res.status(200).json({
          message: 'Succesfully uploaded',
          url
        })
      }

      return res.status(500).json({
        message: 'Error when uploading photo'
      })
    } catch (error) {
      const { message } = LoggerService.errorMessageHandler(error, 'Error in update recipe by id controller')

      return res.status(500).json({ message })
    }
  }
}
