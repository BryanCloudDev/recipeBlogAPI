import {
  type IRecipeService,
  type IFileService,
  type IStepService,
  type IIngredientService,
  type IRecipeRequest,
  type IRecipeRepository,
  type IFilter,
  type IGetAllItemsResult
} from '../dto'
import { type User, type Recipe } from '../models'
import { FileService, IngredientService, LoggerService, StepService, getAllItems } from './'
import { RecipeRepository } from '../repositories'

export class RecipeService implements IRecipeService {
  readonly fileService: IFileService

  constructor(
    private readonly _fileService: IFileService = new FileService(),
    private readonly ingredientService: IIngredientService = new IngredientService(),
    private readonly repository: IRecipeRepository = new RecipeRepository(),
    private readonly stepService: IStepService = new StepService()
  ) {
    this.fileService = _fileService
  }

  public createRecipeInstanceService = (recipeRequest: IRecipeRequest): Recipe => {
    try {
      const { ingredients, steps, ...recipe } = recipeRequest

      const userInstance = this.repository.recipe.create({
        ...recipe
      })

      const stepsInstance = steps.map(step => this.stepService.createStepInstanceService(step))
      const ingredientsInstance = ingredients.map(ingredient =>
        this.ingredientService.createIngredientInstanceService(ingredient)
      )

      userInstance.step = stepsInstance
      userInstance.ingredient = ingredientsInstance

      return userInstance
    } catch (error: any) {
      throw new Error(LoggerService.errorMessageHandler(error, 'Error in create recipe instance service').message)
    }
  }

  public createRecipeService = async (recipe: Recipe, user: User): Promise<number> => {
    try {
      const createdRecipe = await this.repository.recipe.save({ ...recipe, user })

      const stepsPromises: Array<Promise<void>> = recipe.step.map(step =>
        this.stepService.createStepService(step, createdRecipe)
      )

      const ingredientsPromises: Array<Promise<void>> = recipe.ingredient.map(ingredient =>
        this.ingredientService.createIngredientService(ingredient, createdRecipe)
      )

      await Promise.all([stepsPromises, ingredientsPromises])

      return createdRecipe.id
    } catch (error: any) {
      throw new Error(LoggerService.errorMessageHandler(error, 'Error in create recipe service').message)
    }
  }

  public getRecipebyIdService = async (id: number): Promise<Recipe | null> => {
    try {
      const recipe = await this.repository.recipe.findOne({ where: { id }, relations: ['step', 'ingredient'] })
      return recipe
    } catch (error: any) {
      throw new Error(LoggerService.errorMessageHandler(error, 'Error in get recipe by id service').message)
    }
  }

  public updateRecipeByIdService = async (id: number, recipe: IRecipeRequest): Promise<void> => {
    try {
      const { steps, ingredients, ...recipeRequest } = recipe

      let stepsPromises: Array<Promise<void>> = []
      let ingredientsPromises: Array<Promise<void>> = []

      if (steps !== undefined) {
        stepsPromises = steps.map(step => this.stepService.updateStepService(step))
      }

      if (ingredients !== undefined) {
        ingredientsPromises = ingredients.map(ingredient => this.ingredientService.updateIngredientService(ingredient))
      }

      await Promise.all([stepsPromises, ingredientsPromises])

      await this.repository.recipe.update(id, {
        ...recipeRequest
      })
    } catch (error: any) {
      throw new Error(LoggerService.errorMessageHandler(error, 'Error in update recipe by id service').message)
    }
  }

  public getAllRecipesService = async (filter?: IFilter<Recipe>): Promise<IGetAllItemsResult<Recipe>> => {
    try {
      const result = await getAllItems({
        filter,
        repository: this.repository.recipe
      })

      return result
    } catch (error: any) {
      throw new Error(LoggerService.errorMessageHandler(error, 'Error in get all recipes service').message)
    }
  }

  public getRecipesBySearchService = async (search: string): Promise<Recipe[]> => {
    try {
      const recipes = await this.repository.recipe
        .createQueryBuilder('recipe')
        .where('recipe.title LIKE :search', { search: `%${search}%` })
        .orWhere('recipe.title LIKE :search', { search: `%${search}%` })
        .getMany()

      return recipes
    } catch (error: any) {
      throw new Error(LoggerService.errorMessageHandler(error, 'Error in get recipes by custom search service').message)
    }
  }
}
