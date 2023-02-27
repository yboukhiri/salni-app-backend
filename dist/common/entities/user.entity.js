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
var User_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const typeorm_1 = require("typeorm");
const friend_request_entity_1 = require("./friend-request.entity");
let User = User_1 = class User extends typeorm_1.BaseEntity {
    async nullCheck() {
        if (!this.friends) {
            this.friends = [];
        }
        if (!this.blockedUsers) {
            this.blockedUsers = [];
        }
        if (!this.sentFriendRequests) {
            this.sentFriendRequests = [];
        }
        if (!this.receivedFriendRequests) {
            this.receivedFriendRequests = [];
        }
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "lastName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => User_1, (user) => user.friends),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], User.prototype, "friends", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => User_1, (user) => user.blockedUsers),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], User.prototype, "blockedUsers", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => friend_request_entity_1.FriendRequest, (friendRequest) => friendRequest.sender),
    __metadata("design:type", Array)
], User.prototype, "sentFriendRequests", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => friend_request_entity_1.FriendRequest, (friendRequest) => friendRequest.receiver),
    __metadata("design:type", Array)
], User.prototype, "receivedFriendRequests", void 0);
__decorate([
    (0, typeorm_1.AfterLoad)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], User.prototype, "nullCheck", null);
User = User_1 = __decorate([
    (0, typeorm_1.Entity)()
], User);
exports.User = User;
//# sourceMappingURL=user.entity.js.map