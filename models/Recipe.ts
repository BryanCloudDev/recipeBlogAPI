import {
  Entity,
  Column,
  ManyToOne,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { User } from './'

@Entity()
export class Recipe {
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

  @CreateDateColumn({ type: 'timestamp' })
  createdOn: Date

  @UpdateDateColumn({ type: 'timestamp' })
  updatedOn: Date
}
