import type { IIngredientRequest, IStepRequest } from '../'

export interface IRecipeRequest {
  description: string
  ingredients: IIngredientRequest[]
  steps: IStepRequest[]
  title: string
  photo: string
  status: number
}
