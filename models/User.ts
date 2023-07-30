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

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: false })
  firstName: string

  @Column({ nullable: false })
  lastName: string

  @Column({ nullable: false })
  birthDate: Date

  @Column({ unique: true })
  email: string

  @Column({ nullable: false })
  password: string

  // 1: Status.ACTIVE, I do not know why typeORM crashes when I add the enum here
  @Column({ default: 1 })
  status: number

  @Column({ nullable: true })
  lastLogin: Date

  @Column({ default: null })
  photo: string

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
