import { IsEmail, IsString, Length } from "class-validator";
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
  BeforeRemove,
} from "typeorm";
import { Deal } from "./deal.entity";
import { FriendRequest } from "./friend-request.entity";
import { Gender } from "../enums/gender.enum";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  @IsString()
  @Length(2, 255)
  firstName: string;

  @Column({ nullable: false })
  @Length(2, 255)
  lastName: string;

  @Column({ nullable: false })
  @Unique(["email"])
  @IsEmail()
  email: string;

  @Column({ nullable: false })
  @IsString()
  @Length(8, 255)
  password: string;

  @Column({ type: "int", nullable: false })
  birthDay: number;

  @Column({ type: "int", nullable: false })
  birthMonth: number;

  @Column({ type: "int", nullable: false })
  birthYear: number;

  @Column({ type: "enum", enum: Gender, nullable: false })
  gender: Gender;

  @ManyToMany(() => User, (user) => user.friends)
  @JoinTable()
  friends: User[];

  @ManyToMany(() => User, (user) => user.blockedUsers)
  @JoinTable()
  blockedUsers: User[];

  @OneToMany(() => FriendRequest, (friendRequest) => friendRequest.sender, {
    cascade: true,
  })
  sentFriendRequests: FriendRequest[];

  @OneToMany(() => FriendRequest, (friendRequest) => friendRequest.receiver)
  receivedFriendRequests: FriendRequest[];

  @ManyToMany(() => Deal, (deal) => deal.users)
  @JoinTable()
  deals: Deal[];

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

  @BeforeRemove()
  async removeRelations() {
    const promises = [];
    this.friends.forEach(async (friend) => {
      friend.friends = friend.friends.filter((f) => f.id !== this.id);
      promises.push(friend.save());
    });
    this.blockedUsers.forEach(async (blockedUser) => {
      blockedUser.blockedUsers = blockedUser.blockedUsers.filter(
        (bu) => bu.id !== this.id
      );
      promises.push(blockedUser.save());
    });
    this.receivedFriendRequests.forEach(async (receivedFriendRequest) => {
      receivedFriendRequest.receiver = null;
      promises.push(receivedFriendRequest.save());
    });
    await Promise.all(promises);
  }
}
