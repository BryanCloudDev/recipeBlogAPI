import { AppDataSource } from '../database'
import { User } from '../models'
import IngredientRepository from './IngredientRepository'
import RecipeRepository from './RecipeRepository'
import RoleRepository from './RoleRepository'
import StepRepository from './StepRepository'
import UserRepository from './UserRepository'

const userRepository = AppDataSource.getRepository(User)

export { IngredientRepository, RecipeRepository, RoleRepository, StepRepository, UserRepository, userRepository }
