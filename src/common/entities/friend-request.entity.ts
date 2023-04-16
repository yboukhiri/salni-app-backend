import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  BaseEntity,
} from "typeorm";
import { User } from "./user.entity";

@Entity()
export class FriendRequest extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  senderId: number;

  @Column()
  receiverId: number;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: "senderId" })
  sender: User;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: "receiverId" })
  receiver: User;

  @Column({ default: false })
  accepted: boolean;

  @Column({ default: false })
  cancelled: boolean;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;
}
