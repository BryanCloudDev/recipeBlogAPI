import { type EntityTarget } from 'typeorm'
import { type Ingredient } from '../models'
import RepositoryBase from './RepositoryBase'

export default class IngredientRepository extends RepositoryBase<EntityTarget<Ingredient>> {}
