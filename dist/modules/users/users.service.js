"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const user_entity_1 = require("../../common/entities/user.entity");
let UsersService = class UsersService {
    async getUsers() {
        return await user_entity_1.User.find({
            relations: ['friends', 'blockedUsers'],
        });
    }
    async getUserById(id) {
        const user = await user_entity_1.User.findOne({
            where: { id },
            relations: [
                'friends',
                'blockedUsers',
                'sentFriendRequests',
                'receivedFriendRequests',
            ],
        });
        if (!user) {
            throw new Error('User does not exist');
        }
        return user;
    }
    getUserByEmail(username) {
        return user_entity_1.User.findOne({
            where: { email: username },
            relations: [
                'friends',
                'blockedUsers',
                'sentFriendRequests',
                'receivedFriendRequests',
            ],
        });
    }
    async createUser(email, password, firstName, lastName) {
        const user = new user_entity_1.User();
        user.email = email;
        user.password = password;
        user.firstName = firstName;
        user.lastName = lastName;
        return await user_entity_1.User.save(user);
    }
    async addRandomUser() {
        const user = new user_entity_1.User();
        user.firstName = 'John' + Math.random();
        user.lastName = 'Doe' + Math.random();
        user.email = 'john.doe' + Math.random() + '@gmail.com';
        return user_entity_1.User.save(user);
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)()
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map