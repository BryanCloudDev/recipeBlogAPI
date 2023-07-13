import { type IStepRequest } from '..'
import { type Recipe, type Step } from '../../models'

export interface IStepService {
  createStepInstanceService: (stepRequest: IStepRequest) => Step
  createStepService: (step: Step, recipe: Recipe) => Promise<void>
  updateStepService: (step: IStepRequest) => Promise<void>
}
