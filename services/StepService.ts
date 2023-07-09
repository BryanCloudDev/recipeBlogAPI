import type IStepRepository from '../dto/recipe/step/IStepRepository'
import { StepRepository } from '../repositories'
import { type IStepService, type IStepRequest } from '../dto'
import { type Step, type Recipe } from '../models'

export default class StepService implements IStepService {
  constructor(readonly repository: IStepRepository = new StepRepository()) {}

  createStepInstanceService = (stepRequest: IStepRequest): Step => {
    return this.repository.step.create({ ...stepRequest })
  }

  createStepService = async (step: Step, recipe: Recipe): Promise<void> => {
    await this.repository.step.save({ ...step, recipe })
  }
}
