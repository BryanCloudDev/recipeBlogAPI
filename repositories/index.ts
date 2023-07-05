import { AppDataSource } from '../database'
import { Ingredient, Recipe, Role, Step, User } from '../models'

const ingredientRepository = AppDataSource.getRepository(Ingredient)
const recipeRepository = AppDataSource.getRepository(Recipe)
const roleRepository = AppDataSource.getRepository(Role)
const stepRepository = AppDataSource.getRepository(Step)
const userRepository = AppDataSource.getRepository(User)

export {
  ingredientRepository,
  recipeRepository,
  roleRepository,
  stepRepository,
  userRepository
}
