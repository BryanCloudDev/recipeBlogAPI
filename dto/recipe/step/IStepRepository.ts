import { type Repository } from 'typeorm'
import { type Step } from '../../../models'

export default interface IStepRepository {
  step: Repository<Step>
}
