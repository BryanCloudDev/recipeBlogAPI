import { Entity, ManyToOne } from 'typeorm'
import { ItemRecipeBase, Recipe } from '.'

@Entity()
export default class Step extends ItemRecipeBase {
  @ManyToOne(() => Recipe, recipe => recipe.step)
  recipe: Recipe
}
