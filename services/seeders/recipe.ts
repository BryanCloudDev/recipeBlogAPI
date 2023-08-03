import { faker } from '@faker-js/faker'
import { type IIngredientRequest, type IStepRequest, type IRecipeRequest } from '../../dto'
import { type User, type Recipe } from '../../models'
import { UserService } from '../UserService'
import { RecipeService } from '../RecipeService'

const recipeService = new RecipeService()
const userService = new UserService()

type ItemsType = IIngredientRequest | IStepRequest

const createItems = <T extends ItemsType>(amount: number, type: string): Array<Partial<T>> => {
  const items: Array<Partial<T>> = []

  for (let index = 0; index < amount; index++) {
    const item = {
      title: `${type} ${index + 1}`,
      order: index + 1
    }

    items.push(item as Partial<T>)
  }

  return items
}

const createDummyRecipe = async (itemsAmount: number): Promise<Recipe> => {
  const title = faker.lorem.word()
  const description = faker.lorem.word()

  const ingredientsPartial = createItems(itemsAmount, 'Ingredient')

  const stepsPartial = createItems(itemsAmount, 'Step')

  const steps = stepsPartial as IStepRequest[]
  const ingredients = ingredientsPartial as IIngredientRequest[]

  const recipe: Partial<IRecipeRequest> = {
    description,
    ingredients,
    photo: 'photo/recipes/ee7eb59d-ad94-4df8-ad31-c482458422c7.png',
    steps,
    title
  }

  const recipeInstance = recipeService.createRecipeInstanceService(recipe)

  return recipeInstance
}

const createMultipleRecipes = async (count: number): Promise<void> => {
  const recipePromises: Array<Promise<number>> = []

  const user = (await userService.getUserbyIdService(1)) as User

  for (let i = 0; i < count; i++) {
    const recipe = await createDummyRecipe(10)
    recipePromises.push(recipeService.createRecipeService(recipe, user))
  }

  await Promise.all(recipePromises)
}

export { createMultipleRecipes }
