import {
  type IUserMiddleWare,
  type IRecipeMiddleWare,
  type IAuthenticationMiddleWare,
  type ICustomRequest,
  type IRecipeService
} from '../dto'
import { AuthenticationMiddleWare, UserMiddleWare } from '.'
import { type Response, type NextFunction } from 'express'
import { LoggerService, RecipeService, Status } from '../services'

export class RecipeMiddleWare implements IRecipeMiddleWare {
  readonly authenticationMiddleware: IAuthenticationMiddleWare
  readonly userMiddleware: IUserMiddleWare

  constructor(
    private readonly _authenticationMiddleware: IAuthenticationMiddleWare = new AuthenticationMiddleWare(),
    private readonly _userMiddleware: IUserMiddleWare = new UserMiddleWare(),
    private readonly recipeService: IRecipeService = new RecipeService()
  ) {
    this.authenticationMiddleware = _authenticationMiddleware
    this.userMiddleware = _userMiddleware
  }

  validateRecipeId = async (req: ICustomRequest, res: Response, next: NextFunction): Promise<Response | undefined> => {
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
    req: ICustomRequest,
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
