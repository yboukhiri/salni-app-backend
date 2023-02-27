import { User } from 'src/common/entities/user.entity';
export declare class UsersService {
    getUsers(): Promise<User[]>;
    getUserById(id: number): Promise<User>;
    getUserByEmail(username: string): Promise<User>;
    createUser(email: string, password: string, firstName: string, lastName: string): Promise<User>;
    addRandomUser(): Promise<User>;
}
