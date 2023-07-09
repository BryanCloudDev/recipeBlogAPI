import { type Repository } from 'typeorm'
import { type Step } from '../../models'

export interface IStepRepository {
  step: Repository<Step>
}
