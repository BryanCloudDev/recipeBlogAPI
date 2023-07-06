import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne
} from 'typeorm'
import { Recipe, Role } from './'
import { Status } from '../dto'

@Entity()
export default class User {
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

  @Column({ default: Status.ACTIVE })
  status: number

  @Column({ nullable: true })
  lastLogin: Date

  @OneToMany(() => Recipe, recipe => recipe.user)
  recipes: Recipe[]

  @ManyToOne(() => Role, role => role.user)
  role: Role

  @CreateDateColumn({ type: 'timestamp' })
  createdOn: Date

  @UpdateDateColumn({ type: 'timestamp' })
  updatedOn: Date

  toJSON(): Omit<this, 'password' | 'updatedOn' | 'toJSON'> {
    const { password, updatedOn, ...user } = this
    return user
  }
}
