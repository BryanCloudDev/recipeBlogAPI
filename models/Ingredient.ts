import { Entity, ManyToOne } from 'typeorm'
import { ItemRecipeBase } from './ItemRecipeBase'
import { Recipe } from './Recipe'

@Entity()
export class Ingredient extends ItemRecipeBase {
  @ManyToOne(() => Recipe, recipe => recipe.ingredient)
  recipe: Recipe
}
