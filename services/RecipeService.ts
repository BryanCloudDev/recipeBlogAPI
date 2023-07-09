import { type QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity'
import {
  type IStepService,
  type IFileService,
  type IRecipeRequest,
  type IRecipeService,
  type IIngredientService
} from '../dto'
import type IRecipeRepository from '../dto/recipe/IRecipeRepository'
import { type Recipe } from '../models'
import RecipeRepository from '../repositories/RecipeRepository'
import FileService from './FileService'
import IngredientService from './IngredientService'
import StepService from './StepService'

export default class RecipeService implements IRecipeService {
  constructor(
    private readonly repository: IRecipeRepository = new RecipeRepository(),
    private readonly fileService: IFileService = new FileService(),
    private readonly stepService: IStepService = new StepService(),
    private readonly ingredientService: IIngredientService = new IngredientService()
  ) {}

  createRecipeInstanceService = (recipeRequest: IRecipeRequest): Recipe => {
    try {
      const { ingredients, photo, steps, ...recipe } = recipeRequest

      const photoBuffer = this.fileService.convertFileToBuffer(photo)

      const userInstance = this.repository.recipe.create({
        ...recipe,
        photo: photoBuffer
      })

      const stepsInstance = steps.map(step => this.stepService.createStepInstanceService(step))
      const ingredientsInstance = steps.map(ingredient =>
        this.ingredientService.createIngredientInstanceService(ingredient)
      )

      userInstance.step = stepsInstance
      userInstance.ingredient = ingredientsInstance

      return userInstance
    } catch (error) {
      console.log(error.message)

      throw new Error('Error in create recipe instance service')
    }
  }

  createRecipeService = async (recipe: Recipe): Promise<void> => {
    try {
      const createdRecipe = await this.repository.recipe.save(recipe)

      const stepsPromises: Array<Promise<void>> = recipe.step.map(step =>
        this.stepService.createStepService(step, createdRecipe)
      )

      const ingredientsPromises: Array<Promise<void>> = recipe.ingredient.map(ingredient =>
        this.ingredientService.createIngredientService(ingredient, createdRecipe)
      )

      await Promise.all([stepsPromises, ingredientsPromises])
    } catch (error) {
      throw new Error('Error in create recipe service')
    }
  }

  getRecipebyIdService = async (id: number): Promise<Recipe | null> => {
    try {
      const recipe = await this.repository.recipe.findOneBy({ id })
      return recipe
    } catch (error) {
      throw new Error('Error in get recipe by id service')
    }
  }

  updateRecipeByIdService = async (id: number, recipe: QueryDeepPartialEntity<Recipe>): Promise<void> => {
    try {
      await this.repository.recipe.update(id, { ...recipe })
    } catch (error) {
      throw new Error('Error in update recipe by id service')
    }
  }

  getAllRecipesService = async (): Promise<Recipe[]> => {
    try {
      const users = await this.repository.recipe.find()
      return users
    } catch (error) {
      throw new Error('Error in get all recipes service')
    }
  }

  deleteRecipebyIdService = async (id: number): Promise<void> => {
    try {
      await this.repository.recipe.delete(id)
    } catch (error) {
      throw new Error('Error in delete recipe by id service')
    }
  }

  getRecipesBySearchService = async (search: string): Promise<Recipe[]> => {
    try {
      const recipes = await this.repository.recipe
        .createQueryBuilder('recipe')
        .where('recipe.title LIKE :search', { search: `%${search}%` })
        .orWhere('recipe.title LIKE :search', { search: `%${search}%` })
        .getMany()

      return recipes
    } catch (error) {
      throw new Error('Error in get recipes by custom search service')
    }
  }
}
