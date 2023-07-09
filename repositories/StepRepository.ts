import { type Repository } from 'typeorm'
import { stepRepository } from './repositories'
import { type Step } from '../models'
import type IStepRepository from '../dto/recipe/step/IStepRepository'

export default class StepRepository implements IStepRepository {
  constructor(readonly step: Repository<Step> = stepRepository) {}
}
