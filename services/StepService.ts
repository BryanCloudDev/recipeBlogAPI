import { type IStepService, type IStepRequest, type IStepRepository } from '../dto'
import { type Step, type Recipe } from '../models'
import { StepRepository } from '../repositories'
export class StepService implements IStepService {
  constructor(readonly repository: IStepRepository = new StepRepository()) {}

  createStepInstanceService = (stepRequest: IStepRequest): Step => {
    return this.repository.step.create({ ...stepRequest })
  }

  createStepService = async (step: Step, recipe: Recipe): Promise<void> => {
    await this.repository.step.save({ ...step, recipe })
  }
}
