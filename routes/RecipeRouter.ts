import { type IRecipeRouter, type IRecipeController, type IRecipeMiddleWare } from '../dto'
import { type Router } from 'express'
import { RecipeController } from '../controllers'
import { routeFactory } from '../services'
import { RecipeMiddleWare } from '../middlewares'

export class RecipeRouter implements IRecipeRouter {
  public readonly _router: Router
  public readonly route = '/recipes'

  constructor(
    private readonly recipeController: IRecipeController = new RecipeController(),
    private readonly recipeMiddleWare: IRecipeMiddleWare = new RecipeMiddleWare(),
    private readonly Router: () => Router = routeFactory
  ) {
    this._router = Router()
    this.initializeRoutes()
  }

  initializeRoutes(): void {
    this.createRecipe()
    this.deleteRecipeById()
    this.getAllRecipes()
    this.getRecipesBySearch()
    this.getRecipeById()
    this.updateRecipeById()
  }

  private createRecipe(): void {
    this._router.post('/', this.recipeController.createRecipe)
  }

  private getAllRecipes(): void {
    this._router.get('/', this.recipeController.getAllRecipes)
  }

  private deleteRecipeById(): void {
    this._router.delete('/:id', this.recipeController.deleteRecipeById)
  }

  private getRecipeById(): void {
    this._router.get('/:id', this.recipeController.getRecipeById)
  }

  private getRecipesBySearch(): void {
    this._router.get('/search', this.recipeController.getRecipesByText)
  }

  private updateRecipeById(): void {
    this._router.patch('/', this.recipeController.updateRecipeById)
  }

  public get router(): Router {
    return this._router
  }
}
