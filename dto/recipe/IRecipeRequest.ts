import type { IIngredientRequest, IStepRequest } from '../'

export interface IRecipeRequest {
  description: string
  ingredients: IIngredientRequest[]
  steps: IStepRequest[]
  title: string
  status: number
}
