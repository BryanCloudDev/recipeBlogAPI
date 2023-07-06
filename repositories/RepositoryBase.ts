import { Repository, type EntityTarget, type EntityManager, type QueryRunner, type ObjectLiteral } from 'typeorm'

export default abstract class RepositoryBase<T extends ObjectLiteral> extends Repository<T> {
  constructor(target: EntityTarget<T>, manager: EntityManager, queryRunner?: QueryRunner | undefined) {
    super(target, manager, queryRunner)
  }
}
