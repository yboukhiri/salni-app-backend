import { Injectable } from "@nestjs/common";
import { FriendRequest } from "../../common/entities/friend-request.entity";
import { User } from "../../common/entities/user.entity";
import { userToDto } from "../../common/mappers/user-to-dto";
import { AuthService } from "../auth/auth.service";
import { UsersService } from "./users.service";
import { EntityManager, Not } from "typeorm";
import { InjectEntityManager } from "@nestjs/typeorm";
import { friendRequestToDto } from "src/common/mappers/friend-request-to-dto";

@Injectable()
export class FriendshipService {
  constructor(
    private readonly usersService: UsersService,
    private authService: AuthService,
    @InjectEntityManager() private readonly entityManager: EntityManager
  ) {}

  async getUsers(req) {
    const user = await this.authService.getCurrentUser(req);
    const users = await User.find({
      where: { id: Not(user.id) },
    });

    const filteredUsers = await Promise.all(
      users.map(async (user_) => {
        const isBlocked = await this.areBlocked(user.id, user_.id);
        return isBlocked ? null : user_;
      })
    ).then((users) => users.filter((user) => user !== null));
    return filteredUsers.map((user) => userToDto(user));
  }

  async getFriends(req) {
    const user = await this.authService.getCurrentUser(req);
    return user.friends.map((friend) => userToDto(friend));
  }

  async getBlockedUsers(req) {
    const user = await this.authService.getCurrentUser(req);
    return user.blockedUsers.map((blockedUser) => userToDto(blockedUser));
  }

  async getReceivedFriendRequests(req) {
    const user = await this.authService.getCurrentUser(req);
    return user.receivedFriendRequests.map((friendRequest) =>
      friendRequestToDto(friendRequest)
    );
  }

  async getSentFriendRequests(req) {
    const user = await this.authService.getCurrentUser(req);
    return user.sentFriendRequests.map((friendRequest) =>
      friendRequestToDto(friendRequest)
    );
  }

  async sendFriendRequest(req, receiverId: number) {
    const senderId = (await this.authService.getCurrentUser(req)).id;
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
    await friendRequest.save();
    return friendRequestToDto(friendRequest);
  }

  async acceptFriendRequest(requestId: number, req) {
    const receiverId = (await this.authService.getCurrentUser(req)).id;
    const friendRequest = await FriendRequest.findOne({
      where: { id: requestId },
    });
    if (!friendRequest) {
      throw new Error("Friend request does not exist");
    }
    const senderId = friendRequest.senderId;
    if (await this.areFriends(senderId, receiverId)) {
      FriendRequest.delete(friendRequest.id);
      throw new Error("Users are already friends");
    }
    if (await this.areBlocked(senderId, receiverId)) {
      FriendRequest.delete(friendRequest.id);
      throw new Error("Users are blocked");
    }

    const result = await this.entityManager.transaction(async (manager) => {
      const sender = await this.usersService.getUserById(senderId);
      const receiver = await this.usersService.getUserById(receiverId);

      sender.friends.push(receiver);
      receiver.friends.push(sender);

      await manager.save(User, sender);
      await manager.save(User, receiver);
      await manager.delete(FriendRequest, friendRequest.id);
    });
    return result;
  }

  async cancelFriendRequest(requestId: number, req) {
    const senderId = (await this.authService.getCurrentUser(req)).id;
    const friendRequest = await FriendRequest.findOne({
      where: { id: requestId, senderId: senderId },
    });
    if (!friendRequest) {
      throw new Error("Friend request does not exist");
    }
    return FriendRequest.delete(friendRequest.id);
  }

  async unfriend(friendId: number, req) {
    const userId = (await this.authService.getCurrentUser(req)).id;
    if (!(await this.areFriends(userId, friendId))) {
      throw new Error("Users are not friends");
    }
    const result = await this.entityManager.transaction(async (manager) => {
      const user = await this.usersService.getUserById(userId);
      const friend = await this.usersService.getUserById(friendId);

      user.friends = user.friends.filter((friend) => friend.id != friendId);
      friend.friends = friend.friends.filter((friend) => friend.id != userId);

      await manager.save(User, user);
      await manager.save(User, friend);
    });
  }

  async block(userToBlockId: number, req) {
    const userId = (await this.authService.getCurrentUser(req)).id;
    if (await this.areBlocked(userId, userToBlockId)) {
      throw new Error("Users are already blocked");
    }
    const result = await this.entityManager.transaction(async (manager) => {
      const user = await this.usersService.getUserById(userId);
      const blockedUser = await this.usersService.getUserById(userToBlockId);
      user.friends = user.friends.filter(
        (friend) => friend.id != userToBlockId
      );
      user.blockedUsers.push(blockedUser);
      blockedUser.friends = blockedUser.friends.filter(
        (friend) => friend.id != userId
      );
      blockedUser.blockedUsers.push(user);
      await manager.save(User, user);
      await manager.save(User, blockedUser);
    });
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
