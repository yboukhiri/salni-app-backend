import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Transaction } from "./transaction.entity";
import { User } from "./user.entity";

@Entity()
export class Deal extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId1: number;

  @Column()
  userId2: number;

  @ManyToMany(() => User, (user) => user.deals)
  @JoinTable()
  users: User[];

  @OneToMany(() => Transaction, (transaction) => transaction.deal)
  transactions: Transaction[];
}
