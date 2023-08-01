import { LoggerService } from '.'
import { type IIngredientService, type IIngredientRequest, type IIngredientRepository } from '../dto'
import { type Ingredient, type Recipe } from '../models'
import { IngredientRepository } from '../repositories'

export class IngredientService implements IIngredientService {
  constructor(readonly repository: IIngredientRepository = new IngredientRepository()) {}

  public createIngredientInstanceService = (ingredientRequest: IIngredientRequest): Ingredient => {
    try {
      return this.repository.ingredient.create({ ...ingredientRequest })
    } catch (error: any) {
      throw new Error(LoggerService.errorMessageHandler(error, 'Error in create ingredient instance service').message)
    }
  }

  public createIngredientService = async (ingredient: Ingredient, recipe: Recipe): Promise<void> => {
    try {
      await this.repository.ingredient.save({ ...ingredient, recipe })
    } catch (error: any) {
      throw new Error(LoggerService.errorMessageHandler(error, 'Error in create ingredient service').message)
    }
  }

  public updateIngredientService = async (ingredient: IIngredientRequest): Promise<void> => {
    try {
      const { id } = ingredient
      await this.repository.ingredient.update(id, { ...ingredient })
    } catch (error: any) {
      throw new Error(LoggerService.errorMessageHandler(error, 'Error in update ingredient service').message)
    }
  }
}
