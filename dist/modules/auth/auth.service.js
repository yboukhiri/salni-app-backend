"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const serviceAccount = require("./serviceAccountKey.json");
const auth_1 = require("firebase/auth");
const app_1 = require("firebase/app");
let AuthService = class AuthService {
    async onModuleInit() {
        const firebaseConfig = serviceAccount;
        this.app = (0, app_1.initializeApp)(firebaseConfig);
        console.log('Firebase initialized');
    }
    async signInWithEmailAndPassword(email, password) {
        console.log('signInWithEmailAndPassword');
        console.log('email', email);
        console.log('password', password);
        if (!this.auth) {
            throw new Error('Firebase auth not initialized.');
        }
        else {
            console.log('Firebase auth initialized.');
        }
        console.log('start auth 2');
        const auth2 = (0, auth_1.getAuth)();
        console.log('auth2', auth2);
        if (!(0, auth_1.getAuth)()) {
            throw new Error('XXX Firebase auth not initialized. XXX');
        }
        else {
            console.log('Firebase auth initialized 22222222222');
        }
        const userCredentials = await (0, auth_1.signInWithEmailAndPassword)(this.auth, email, password);
        return userCredentials;
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)()
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map