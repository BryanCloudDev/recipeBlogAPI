import {
  Entity,
  Column,
  ManyToOne,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany
} from 'typeorm'
import { Ingredient, Step, User } from './'

@Entity()
export default class Recipe {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: false })
  title: string

  @Column({ nullable: false })
  description: string

  // 1: Status.ACTIVE, I do not know why typeORM crashes when I add the enum here
  @Column({ default: 1 })
  status: number

  @Column('mediumblob', { nullable: false })
  photo: Buffer

  @ManyToOne(() => User, user => user.recipes)
  user: User

  @OneToMany(() => Step, step => step.recipe)
  step: Step[]

  @OneToMany(() => Ingredient, ingredient => ingredient.recipe)
  ingredient: Ingredient[]

  @CreateDateColumn({ type: 'timestamp' })
  createdOn: Date

  @UpdateDateColumn({ type: 'timestamp' })
  updatedOn: Date
}
