"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const friendship_service_1 = require("./friendship.service");
const users_service_1 = require("./users.service");
let UsersController = class UsersController {
    constructor(usersService, friendshipService) {
        this.usersService = usersService;
        this.friendshipService = friendshipService;
    }
    getUsers() {
        return this.usersService.getUsers();
    }
    addRandomUser() {
        return this.usersService.addRandomUser();
    }
    getUser(id) {
        return this.usersService.getUserById(id);
    }
    sendFriendRequest(senderId, receiverId) {
        return this.friendshipService.sendFriendRequest(senderId, receiverId);
    }
    acceptFriendRequest(senderId, receiverId) {
        return this.friendshipService.acceptFriendRequest(senderId, receiverId);
    }
    cancelFriendRequest(senderId, receiverId) {
        return this.friendshipService.cancelFriendRequest(senderId, receiverId);
    }
    unfriend(senderId, receiverId) {
        return this.friendshipService.unfriend(senderId, receiverId);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getUsers", null);
__decorate([
    (0, common_1.Get)('add'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "addRandomUser", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getUser", null);
__decorate([
    (0, common_1.Get)(':senderId/send-friend-request/:receiverId'),
    __param(0, (0, common_1.Param)('senderId')),
    __param(1, (0, common_1.Param)('receiverId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "sendFriendRequest", null);
__decorate([
    (0, common_1.Get)(':receiverId/accept-friend-request/:senderId'),
    __param(0, (0, common_1.Param)('senderId')),
    __param(1, (0, common_1.Param)('receiverId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "acceptFriendRequest", null);
__decorate([
    (0, common_1.Get)(':senderId/cancel-friend-request/:receiverId'),
    __param(0, (0, common_1.Param)('senderId')),
    __param(1, (0, common_1.Param)('receiverId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "cancelFriendRequest", null);
__decorate([
    (0, common_1.Get)(':senderId/unfriend/:receiverId'),
    __param(0, (0, common_1.Param)('senderId')),
    __param(1, (0, common_1.Param)('receiverId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "unfriend", null);
UsersController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        friendship_service_1.FriendshipService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map