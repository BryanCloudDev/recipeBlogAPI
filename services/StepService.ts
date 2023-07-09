import { type IStepService, type IStepRequest, type IStepRepository } from '../dto'
import { type Step, type Recipe } from '../models'
import { StepRepository } from '../repositories'
export class StepService implements IStepService {
  constructor(readonly repository: IStepRepository = new StepRepository()) {}

  createStepInstanceService = (stepRequest: IStepRequest): Step => {
    try {
      return this.repository.step.create({ ...stepRequest })
    } catch (error) {
      throw new Error('Error in create step instance service')
    }
  }

  createStepService = async (step: Step, recipe: Recipe): Promise<void> => {
    try {
      await this.repository.step.save({ ...step, recipe })
    } catch (error) {
      throw new Error('Error in create step service')
    }
  }
}
