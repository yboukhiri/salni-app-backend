import { Injectable } from "@nestjs/common";
import { FriendRequest } from "src/common/entities/friend-request.entity";
import { User } from "src/common/entities/user.entity";
import { userToDto } from "src/common/utils/user-to-dto";
import { AuthService } from "../auth/auth.service";
import { UsersService } from "./users.service";

@Injectable()
export class FriendshipService {
  constructor(
    private readonly usersService: UsersService,
    private authService: AuthService
  ) {}

  async getFriends(req) {
    const user = await this.authService.getCurrentUser(req);
    return user.friends.map((friend) => userToDto(friend));
  }

  async sendFriendRequest(senderId: number, receiverId: number) {
    if (await this.areFriends(senderId, receiverId)) {
      throw new Error("Users are already friends");
    }
    if (await this.areBlocked(senderId, receiverId)) {
      throw new Error("Users are blocked");
    }
    if (await this.friendRequestExists(senderId, receiverId)) {
      throw new Error("Friend request already exists");
    }
    if (senderId === receiverId) {
      throw new Error("Cannot send friend request to yourself");
    }
    const friendRequest = new FriendRequest();
    friendRequest.senderId = senderId;
    friendRequest.receiverId = receiverId;
    friendRequest.sender = await this.usersService.getUserById(senderId);
    friendRequest.receiver = await this.usersService.getUserById(receiverId);
    return FriendRequest.save(friendRequest);
  }

  async acceptFriendRequest(senderId: number, receiverId: number) {
    const friendRequest = await FriendRequest.findOne({
      where: { senderId, receiverId },
    });
    if (!friendRequest) {
      throw new Error("Friend request does not exist");
    }
    if (await this.areFriends(senderId, receiverId)) {
      FriendRequest.delete(friendRequest.id);
      throw new Error("Users are already friends");
    }
    if (await this.areBlocked(senderId, receiverId)) {
      FriendRequest.delete(friendRequest.id);
      throw new Error("Users are blocked");
    }
    const sender = await this.usersService.getUserById(senderId);
    const receiver = await this.usersService.getUserById(receiverId);
    sender.friends.push(receiver);
    receiver.friends.push(sender);
    await User.save(sender);
    await User.save(receiver);
    return FriendRequest.delete(friendRequest.id);
  }

  async cancelFriendRequest(senderId: number, receiverId: number) {
    const friendRequest = await FriendRequest.findOne({
      where: { senderId, receiverId },
    });
    if (!friendRequest) {
      throw new Error("Friend request does not exist");
    }
    return FriendRequest.delete(friendRequest.id);
  }

  async unfriend(userId: number, friendId: number) {
    if (!(await this.areFriends(userId, friendId))) {
      throw new Error("Users are not friends");
    }
    const user = await this.usersService.getUserById(userId);
    const friend = await this.usersService.getUserById(friendId);
    user.friends = user.friends.filter((friend) => friend.id != friendId);
    friend.friends = friend.friends.filter((friend) => friend.id != userId);
    await User.save(user);
    await User.save(friend);
  }

  async blockUser(userId: number, blockedUserId: number) {
    if (await this.areBlocked(userId, blockedUserId)) {
      throw new Error("Users are already blocked");
    }
    const user = await this.usersService.getUserById(userId);
    const blockedUser = await this.usersService.getUserById(blockedUserId);
    user.blockedUsers.push(blockedUser);
    await User.save(user);
  }

  async areFriends(userId: number, friendId: number) {
    const user = await this.usersService.getUserById(userId);
    const friend = await this.usersService.getUserById(friendId);
    if (!user || !friend) {
      throw new Error("One of the users does not exist");
    }
    return user.friends.map((friend) => friend.id).includes(friend.id);
  }

  async areBlocked(userId1: number, userId2: number) {
    const user1 = await this.usersService.getUserById(userId1);
    const user2 = await this.usersService.getUserById(userId2);
    return (
      user1.blockedUsers.map((user) => user.id).includes(user2.id) ||
      user2.blockedUsers.map((user) => user.id).includes(user1.id)
    );
  }

  async friendRequestExists(senderId: number, receiverId: number) {
    const sender = await this.usersService.getUserById(senderId);
    const receiver = await this.usersService.getUserById(receiverId);
    return (
      sender.sentFriendRequests
        .map((request) => request.receiver.id)
        .includes(receiver.id) ||
      receiver.receivedFriendRequests
        .map((request) => request.sender.id)
        .includes(sender.id) ||
      receiver.sentFriendRequests
        .map((request) => request.receiver.id)
        .includes(sender.id) ||
      sender.receivedFriendRequests
        .map((request) => request.sender.id)
        .includes(receiver.id)
    );
  }
}
