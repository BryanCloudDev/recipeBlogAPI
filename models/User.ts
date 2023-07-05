import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany
} from 'typeorm'
import { Recipe } from './'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  firstName: string

  @Column()
  lastName: string

  @Column()
  birthDate: Date

  @Column({ unique: true })
  email: string

  @Column()
  password: string

  @Column({ default: true })
  isActive: boolean

  @OneToMany(() => Recipe, recipe => recipe.user)
  recipes: Recipe[]

  @CreateDateColumn({ type: 'timestamp' })
  createdOn: Date

  @UpdateDateColumn({ type: 'timestamp' })
  updatedOn: Date
}
