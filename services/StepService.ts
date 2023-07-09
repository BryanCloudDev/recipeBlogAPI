import { type IStepRequest, type IStepService } from '../dto'
import type IStepRepository from '../dto/recipe/step/IStepRepository'
import { type Recipe, type Step } from '../models'
import StepRepository from '../repositories/StepRepository'

export default class StepService implements IStepService {
  constructor(readonly repository: IStepRepository = new StepRepository()) {}

  createStepInstanceService = (stepRequest: IStepRequest): Step => {
    return this.repository.step.create({ ...stepRequest })
  }

  createStepService = async (step: Step, recipe: Recipe): Promise<void> => {
    await this.repository.step.save({ ...step, recipe })
  }
}
