import { type IRecipeRouter, type IRecipeController, type IRecipeMiddleWare } from '../dto'
import { type Router } from 'express'
import { RecipeController } from '../controllers'
import { Roles, routeFactory } from '../services'
import { RecipeMiddleWare, validateFields, validateFile } from '../middlewares'
import { body, checkExact } from 'express-validator'

export class RecipeRouter implements IRecipeRouter {
  public readonly _router: Router
  public readonly route = '/recipes'
  private readonly recipeValidations = [
    body('title', 'The title is required').notEmpty().isString().trim(),
    body('description', 'The description is required').notEmpty().isString().trim(),
    body('photo', 'The photo must be a valid base64 value').notEmpty().isString().trim(),
    body('steps', 'Steps must be a valid array').isArray({ min: 1 }),
    body('steps.*.order', 'The order is required in step object').notEmpty().isInt(),
    body('steps.*.title', 'The title is required in step object').notEmpty().isString(),
    body('ingredients', 'Ingredients must be a valid array').isArray({ min: 1 }),
    body('ingredients.*.order', 'The order is required in ingredient object').notEmpty().isInt(),
    body('ingredients.*.title', 'The title is required in ingredient object').notEmpty().isString()
  ]

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
    this._router.post(
      '/',
      [
        this.recipeMiddleWare.authenticationMiddleware.validateJWT,
        this.recipeMiddleWare.authenticationMiddleware.validateRole([Roles.ADMIN]),
        checkExact([...this.recipeValidations], { message: 'Too many fields specified' }),
        validateFields,
        validateFile
      ],
      this.recipeController.createRecipe
    )
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
    this._router.patch(
      '/:id',
      [
        this.recipeMiddleWare.authenticationMiddleware.validateJWT,
        this.recipeMiddleWare.authenticationMiddleware.validateRole([Roles.ADMIN]),
        checkExact([...this.recipeValidations.map(validation => validation.optional())], {
          message: 'Too many fields specified'
        }),
        validateFields,
        validateFile,
        this.recipeMiddleWare.validateRecipeId
      ],
      this.recipeController.updateRecipeById
    )
  }

  public get router(): Router {
    return this._router
  }
}
