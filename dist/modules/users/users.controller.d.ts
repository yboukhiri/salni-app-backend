import { FriendshipService } from './friendship.service';
import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    private friendshipService;
    constructor(usersService: UsersService, friendshipService: FriendshipService);
    getUsers(): Promise<import("../../common/entities/user.entity").User[]>;
    addRandomUser(): Promise<import("../../common/entities/user.entity").User>;
    getUser(id: number): Promise<import("../../common/entities/user.entity").User>;
    sendFriendRequest(senderId: number, receiverId: number): Promise<import("../../common/entities/friend-request.entity").FriendRequest>;
    acceptFriendRequest(senderId: number, receiverId: number): Promise<import("typeorm").DeleteResult>;
    cancelFriendRequest(senderId: number, receiverId: number): Promise<import("typeorm").DeleteResult>;
    unfriend(senderId: number, receiverId: number): Promise<void>;
}
