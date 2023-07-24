import type { IIngredientRequest, IStepRequest } from '../'

export interface IRecipeRequest {
  description: string
  ingredients: IIngredientRequest[]
  photo: string
  steps: IStepRequest[]
  title: string
  status: number
}
