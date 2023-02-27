import { BaseEntity } from 'typeorm';
import { FriendRequest } from './friend-request.entity';
export declare class User extends BaseEntity {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    friends: User[];
    blockedUsers: User[];
    sentFriendRequests: FriendRequest[];
    receivedFriendRequests: FriendRequest[];
    nullCheck(): Promise<void>;
}
