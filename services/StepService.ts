import { LoggerService } from '.'
import { type IStepService, type IStepRequest, type IStepRepository } from '../dto'
import { type Step, type Recipe } from '../models'
import { StepRepository } from '../repositories'
export class StepService implements IStepService {
  constructor(readonly repository: IStepRepository = new StepRepository()) {}

  createStepInstanceService = (stepRequest: IStepRequest): Step => {
    try {
      return this.repository.step.create({ ...stepRequest })
    } catch (error: any) {
      throw new Error(LoggerService.errorMessageHandler(error, 'Error in create step instance service').message)
    }
  }

  createStepService = async (step: Step, recipe: Recipe): Promise<void> => {
    try {
      await this.repository.step.save({ ...step, recipe })
    } catch (error: any) {
      throw new Error(LoggerService.errorMessageHandler(error, 'Error in create step service').message)
    }
  }

  updateStepService = async (step: IStepRequest): Promise<void> => {
    try {
      const { id } = step
      await this.repository.step.update(id, { ...step })
    } catch (error: any) {
      throw new Error(LoggerService.errorMessageHandler(error, 'Error in update step service').message)
    }
  }
}
