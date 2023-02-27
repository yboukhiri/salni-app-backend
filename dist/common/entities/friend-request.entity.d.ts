import { BaseEntity } from 'typeorm';
import { User } from './user.entity';
export declare class FriendRequest extends BaseEntity {
    id: number;
    senderId: number;
    receiverId: number;
    sender: User;
    receiver: User;
    accepted: boolean;
    cancelled: boolean;
    createdAt: Date;
}
