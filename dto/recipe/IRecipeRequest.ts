import type { IIngredientRequest, IStepRequest } from '../'

export default interface IRecipeRequest {
  description: string
  ingredients: IIngredientRequest[]
  photo: string
  steps: IStepRequest[]
  title: string
}
