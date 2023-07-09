import { AppDataSource } from '../database'
import { Ingredient, Recipe, Role, Step, User } from '../models'

export const ingredientRepository = AppDataSource.getRepository(Ingredient)
export const recipeRepository = AppDataSource.getRepository(Recipe)
export const roleRepository = AppDataSource.getRepository(Role)
export const stepRepository = AppDataSource.getRepository(Step)
export const userRepository = AppDataSource.getRepository(User)
