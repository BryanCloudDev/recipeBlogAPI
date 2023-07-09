import { type IStepRepository } from '../dto'
import { type Repository } from 'typeorm'
import { type Step } from '../models'
import { stepRepository } from './repositories'

export class StepRepository implements IStepRepository {
  constructor(readonly step: Repository<Step> = stepRepository) {}
}
