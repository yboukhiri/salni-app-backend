import { IsEmail, IsString, Length } from 'class-validator';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToMany,
  AfterLoad,
  JoinTable,
  OneToMany,
  Unique,
} from 'typeorm';
import { FriendRequest } from './friend-request.entity';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  @IsString()
  @Length(2, 255)
  firstName: string;

  @Column({ nullable: false })
  @Length(1, 255)
  lastName: string;

  @Column({ nullable: false })
  @Unique(['email'])
  @IsEmail()
  email: string;

  @Column({ nullable: false })
  @IsString()
  @Length(8, 255)
  password: string;

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
