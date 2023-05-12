import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
  ManyToOne,
} from "typeorm";
import { Deal } from "./deal.entity";
import { Currency } from "../enums/currency.enum";

@Entity()
export class Transaction extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Deal, (deal) => deal.transactions)
  deal: Deal;

  @Column()
  fromUserId: number;

  @Column()
  toUserId: number;

  @Column()
  amount: number;

  @Column({ type: "enum", enum: Currency, nullable: false })
  currency: Currency;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @Column({ default: false })
  accepted: boolean;

  @Column({ default: false })
  rejected: boolean;

  @Column({ type: "timestamp", nullable: true })
  acceptedAt: Date;

  @Column({ type: "timestamp", nullable: true })
  rejectedAt: Date;
}
