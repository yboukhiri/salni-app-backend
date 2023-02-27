import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signIn(body: {
        email: string;
        password: string;
    }): Promise<import("@firebase/auth").UserCredential>;
}
