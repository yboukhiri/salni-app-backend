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

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @Column({ default: false })
  accepted: boolean;

  @Column({ default: false })
  cancelled: boolean;

  @Column({ type: "timestamp", nullable: true })
  acceptedAt: Date;

  @Column({ type: "timestamp", nullable: true })
  cancelledAt: Date;
}
