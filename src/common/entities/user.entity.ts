import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToMany,
  AfterLoad,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { FriendRequest } from './friend-request.entity';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @ManyToMany(() => User, (user) => user.friends)
  @JoinTable()
  friends: User[];

  @ManyToMany(() => User, (user) => user.blockedUsers)
  @JoinTable()
  blockedUsers: User[];

  @OneToMany(() => FriendRequest, (friendRequest) => friendRequest.sender)
  sentFriendRequests: FriendRequest[];

  @OneToMany(() => FriendRequest, (friendRequest) => friendRequest.receiver)
  receivedFriendRequests: FriendRequest[];

  @AfterLoad()
  async nullCheck() {
    if (!this.friends) {
      this.friends = [];
    }
    if (!this.blockedUsers) {
      this.blockedUsers = [];
    }
    if (!this.sentFriendRequests) {
      this.sentFriendRequests = [];
    }
    if (!this.receivedFriendRequests) {
      this.receivedFriendRequests = [];
    }
  }
}
