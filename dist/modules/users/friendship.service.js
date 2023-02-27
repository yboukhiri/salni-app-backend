"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FriendshipService = void 0;
const common_1 = require("@nestjs/common");
const friend_request_entity_1 = require("../../common/entities/friend-request.entity");
const user_entity_1 = require("../../common/entities/user.entity");
const users_service_1 = require("./users.service");
let FriendshipService = class FriendshipService {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async sendFriendRequest(senderId, receiverId) {
        if (await this.areFriends(senderId, receiverId)) {
            throw new Error('Users are already friends');
        }
        if (await this.areBlocked(senderId, receiverId)) {
            throw new Error('Users are blocked');
        }
        if (await this.friendRequestExists(senderId, receiverId)) {
            throw new Error('Friend request already exists');
        }
        if (senderId === receiverId) {
            throw new Error('Cannot send friend request to yourself');
        }
        const friendRequest = new friend_request_entity_1.FriendRequest();
        friendRequest.senderId = senderId;
        friendRequest.receiverId = receiverId;
        friendRequest.sender = await this.usersService.getUserById(senderId);
        friendRequest.receiver = await this.usersService.getUserById(receiverId);
        return friend_request_entity_1.FriendRequest.save(friendRequest);
    }
    async acceptFriendRequest(senderId, receiverId) {
        const friendRequest = await friend_request_entity_1.FriendRequest.findOne({
            where: { senderId, receiverId },
        });
        if (!friendRequest) {
            throw new Error('Friend request does not exist');
        }
        if (await this.areFriends(senderId, receiverId)) {
            friend_request_entity_1.FriendRequest.delete(friendRequest.id);
            throw new Error('Users are already friends');
        }
        if (await this.areBlocked(senderId, receiverId)) {
            friend_request_entity_1.FriendRequest.delete(friendRequest.id);
            throw new Error('Users are blocked');
        }
        const sender = await this.usersService.getUserById(senderId);
        const receiver = await this.usersService.getUserById(receiverId);
        sender.friends.push(receiver);
        receiver.friends.push(sender);
        await user_entity_1.User.save(sender);
        await user_entity_1.User.save(receiver);
        return friend_request_entity_1.FriendRequest.delete(friendRequest.id);
    }
    async cancelFriendRequest(senderId, receiverId) {
        const friendRequest = await friend_request_entity_1.FriendRequest.findOne({
            where: { senderId, receiverId },
        });
        if (!friendRequest) {
            throw new Error('Friend request does not exist');
        }
        return friend_request_entity_1.FriendRequest.delete(friendRequest.id);
    }
    async unfriend(userId, friendId) {
        if (!(await this.areFriends(userId, friendId))) {
            throw new Error('Users are not friends');
        }
        const user = await this.usersService.getUserById(userId);
        const friend = await this.usersService.getUserById(friendId);
        user.friends = user.friends.filter((friend) => friend.id !== friendId);
        friend.friends = friend.friends.filter((friend) => friend.id !== userId);
        await user_entity_1.User.save(user);
        await user_entity_1.User.save(friend);
    }
    async blockUser(userId, blockedUserId) {
        if (await this.areBlocked(userId, blockedUserId)) {
            throw new Error('Users are already blocked');
        }
        const user = await this.usersService.getUserById(userId);
        const blockedUser = await this.usersService.getUserById(blockedUserId);
        user.blockedUsers.push(blockedUser);
        await user_entity_1.User.save(user);
    }
    async areFriends(userId, friendId) {
        const user = await this.usersService.getUserById(userId);
        const friend = await this.usersService.getUserById(friendId);
        if (!user || !friend) {
            throw new Error('One of the users does not exist');
        }
        return user.friends.map((friend) => friend.id).includes(friend.id);
    }
    async areBlocked(userId1, userId2) {
        const user1 = await this.usersService.getUserById(userId1);
        const user2 = await this.usersService.getUserById(userId2);
        return (user1.blockedUsers.map((user) => user.id).includes(user2.id) ||
            user2.blockedUsers.map((user) => user.id).includes(user1.id));
    }
    async friendRequestExists(senderId, receiverId) {
        const sender = await this.usersService.getUserById(senderId);
        const receiver = await this.usersService.getUserById(receiverId);
        return (sender.sentFriendRequests
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
                .includes(receiver.id));
    }
};
FriendshipService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], FriendshipService);
exports.FriendshipService = FriendshipService;
//# sourceMappingURL=friendship.service.js.map