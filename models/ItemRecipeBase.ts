import { Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

export class ItemRecipeBase {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column()
  order: number

  @CreateDateColumn({ type: 'timestamp' })
  createdOn: Date

  @UpdateDateColumn({ type: 'timestamp' })
  updatedOn: Date

  toJSON(): Omit<this, 'createdOn' | 'updatedOn' | 'toJSON'> {
    const { createdOn, updatedOn, ...ingredient } = this
    return ingredient
  }
}
