import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUser(userCredentials: {
        email: string;
        password: string;
    }): Promise<import("../../common/entities/user.entity").User>;
    login(user: any): Promise<{
        access_token: string;
    }>;
    getCurrentUser(req: any): Promise<import("../../common/entities/user.entity").User>;
}
