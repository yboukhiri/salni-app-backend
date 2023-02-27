import { User } from 'src/common/entities/user.entity';
export declare class UsersService {
    getUsers(): Promise<User[]>;
    getUser(id: number): Promise<User>;
    addRandomUser(): Promise<User>;
}
