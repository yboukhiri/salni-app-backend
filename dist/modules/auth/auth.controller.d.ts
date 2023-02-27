import { User } from 'src/common/entities/user.entity';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly usersService;
    private readonly authService;
    constructor(usersService: UsersService, authService: AuthService);
    createUser(email: string, password: string, firstName: string, lastName: string): Promise<User>;
    login(req: any): Promise<{
        access_token: string;
    }>;
    getCurrentUser(req: any): Promise<User>;
}
