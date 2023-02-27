import { FriendRequest } from 'src/common/entities/friend-request.entity';
import { UsersService } from './users.service';
export declare class FriendshipService {
    private readonly usersService;
    constructor(usersService: UsersService);
    sendFriendRequest(senderId: number, receiverId: number): Promise<FriendRequest>;
    acceptFriendRequest(senderId: number, receiverId: number): Promise<import("typeorm").DeleteResult>;
    cancelFriendRequest(senderId: number, receiverId: number): Promise<import("typeorm").DeleteResult>;
    unfriend(userId: number, friendId: number): Promise<void>;
    blockUser(userId: number, blockedUserId: number): Promise<void>;
    areFriends(userId: number, friendId: number): Promise<boolean>;
    areBlocked(userId1: number, userId2: number): Promise<boolean>;
    friendRequestExists(senderId: number, receiverId: number): Promise<boolean>;
}
