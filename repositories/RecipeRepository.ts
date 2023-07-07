import { type EntityTarget } from 'typeorm'
import { type Recipe } from '../models'
import RepositoryBase from './RepositoryBase'

export default class RecipeRepository extends RepositoryBase<EntityTarget<Recipe>> {}
