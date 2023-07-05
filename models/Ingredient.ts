import { Entity, ManyToOne } from 'typeorm'
import Recipe from './Recipe'
import ItemRecipeBase from './ItemRecipeBase'

@Entity()
export default class Ingredient extends ItemRecipeBase {
  @ManyToOne(() => Recipe, recipe => recipe.ingredient)
  recipe: Recipe
}
