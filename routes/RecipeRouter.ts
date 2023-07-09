import { routeFactory } from '../services'
import { type IRecipeController } from '../dto'
import { type Router } from 'express'
import RecipeController from '../controllers/RecipeController'
import type IRecipeRouter from '../dto/recipe/IRecipeRouter'

export default class RecipeRouter implements IRecipeRouter {
  readonly _router: Router
  readonly route = '/recipes'

  constructor(
    readonly recipeController: IRecipeController = new RecipeController(),
    readonly Router: () => Router = routeFactory
  ) {
    this._router = Router()
    this.initializeRoutes()
  }

  initializeRoutes(): void {
    this._router.post('/', this.recipeController.createRecipe)
    this._router.get('/', this.recipeController.getAllRecipes)
  }

  public get router(): Router {
    return this._router
  }
}
