import {
  type IRecipeService,
  type IFileService,
  type IStepService,
  type IIngredientService,
  type IRecipeRequest,
  type IRecipeRepository
} from '../dto'
import { type User, type Recipe } from '../models'
import { FileService, IngredientService, LoggerService, StepService } from './'
import { RecipeRepository } from '../repositories'

export class RecipeService implements IRecipeService {
  constructor(
    private readonly repository: IRecipeRepository = new RecipeRepository(),
    private readonly fileService: IFileService = new FileService(),
    private readonly stepService: IStepService = new StepService(),
    private readonly ingredientService: IIngredientService = new IngredientService()
  ) {}

  public createRecipeInstanceService = (recipeRequest: IRecipeRequest): Recipe => {
    try {
      const { ingredients, photo, steps, ...recipe } = recipeRequest

      const photoBuffer = this.fileService.convertFileToBuffer(photo)

      const userInstance = this.repository.recipe.create({
        ...recipe,
        photo: photoBuffer
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

  public createRecipeService = async (recipe: Recipe, user: User): Promise<void> => {
    try {
      const createdRecipe = await this.repository.recipe.save({ ...recipe, user })

      const stepsPromises: Array<Promise<void>> = recipe.step.map(step =>
        this.stepService.createStepService(step, createdRecipe)
      )

      const ingredientsPromises: Array<Promise<void>> = recipe.ingredient.map(ingredient =>
        this.ingredientService.createIngredientService(ingredient, createdRecipe)
      )

      await Promise.all([stepsPromises, ingredientsPromises])
    } catch (error: any) {
      throw new Error(LoggerService.errorMessageHandler(error, 'Error in create recipe service').message)
    }
  }

  public getRecipebyIdService = async (id: number): Promise<Recipe | null> => {
    try {
      const recipe = await this.repository.recipe.findOneBy({ id })
      return recipe
    } catch (error: any) {
      throw new Error(LoggerService.errorMessageHandler(error, 'Error in get recipe by id service').message)
    }
  }

  public updateRecipeByIdService = async (id: number, recipe: IRecipeRequest): Promise<void> => {
    try {
      const { photo, steps, ingredients, ...recipeRequest } = recipe

      const photoBuffer = this.fileService.convertFileToBuffer(photo)

      const stepsPromises = steps.map(step => this.stepService.updateStepService(step))
      const ingredientsPromises = ingredients.map(ingredient =>
        this.ingredientService.updateIngredientService(ingredient)
      )

      await Promise.all([stepsPromises, ingredientsPromises])

      await this.repository.recipe.update(id, { ...recipeRequest, photo: photoBuffer })
    } catch (error: any) {
      throw new Error(LoggerService.errorMessageHandler(error, 'Error in update recipe by id service').message)
    }
  }

  public getAllRecipesService = async (): Promise<Recipe[]> => {
    try {
      const users = await this.repository.recipe.find()
      return users
    } catch (error: any) {
      throw new Error(LoggerService.errorMessageHandler(error, 'Error in get all recipes service').message)
    }
  }

  public deleteRecipebyIdService = async (id: number): Promise<void> => {
    try {
      await this.repository.recipe.delete(id)
    } catch (error: any) {
      throw new Error(LoggerService.errorMessageHandler(error, 'Error in delete recipe by id service').message)
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
