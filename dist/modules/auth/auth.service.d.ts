import { OnModuleInit } from '@nestjs/common';
export declare class AuthService implements OnModuleInit {
    private app;
    onModuleInit(): Promise<void>;
    signInWithEmailAndPassword(email: string, password: string): Promise<import("@firebase/auth").UserCredential>;
}
