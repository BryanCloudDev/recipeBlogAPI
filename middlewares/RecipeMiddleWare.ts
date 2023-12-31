import {
  type IUserMiddleWare,
  type IRecipeMiddleWare,
  type IAuthenticationMiddleWare,
  type ICustomRequest,
  type IRecipeService,
  type IFileMiddleWare
} from '../dto'
import { AuthenticationMiddleWare, FileMiddleWare, UserMiddleWare } from '.'
import { type Response, type NextFunction } from 'express'
import { LoggerService, RecipeService, Routes, Status } from '../services'
import { type Recipe } from '../models'

export class RecipeMiddleWare implements IRecipeMiddleWare {
  readonly authenticationMiddleware: IAuthenticationMiddleWare
  readonly fileMiddleWare: IFileMiddleWare
  readonly userMiddleware: IUserMiddleWare

  constructor(
    private readonly _authenticationMiddleware: IAuthenticationMiddleWare = new AuthenticationMiddleWare(),
    private readonly _fileMiddleWare: IFileMiddleWare = new FileMiddleWare(Routes.RECIPES),
    private readonly _userMiddleware: IUserMiddleWare = new UserMiddleWare(),
    private readonly recipeService: IRecipeService = new RecipeService()
  ) {
    this.authenticationMiddleware = _authenticationMiddleware
    this.userMiddleware = _userMiddleware
    this.fileMiddleWare = _fileMiddleWare
  }

  validateRecipeId = async (
    req: ICustomRequest<Recipe>,
    res: Response,
    next: NextFunction
  ): Promise<Response | undefined> => {
    try {
      const id = parseInt(req.params.id)

      const recipe = await this.recipeService.getRecipebyIdService(id)

      if (recipe === null) {
        return res.status(404).json({
          message: `The recipe with the id ${id} does not exist`
        })
      }

      req.recipe = recipe

      next()
    } catch (error: any) {
      throw new Error(LoggerService.errorMessageHandler(error, 'Error in exists recipe by id middleware').message)
    }
  }

  validateRecipeOnDelete = async (
    req: ICustomRequest<Recipe>,
    res: Response,
    next: NextFunction
  ): Promise<Response | undefined> => {
    const recipe = req.recipe

    if (recipe.status === Status.INACTIVE) {
      return res.status(400).json({
        message: `The recipe has been marked already as inactive`
      })
    }

    next()
  }
}
