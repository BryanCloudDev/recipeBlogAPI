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

  @Column()
  title: string

  @Column()
  description: string

  @Column({ default: true })
  isActive: boolean

  @Column('mediumblob')
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
