import {
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Request,
} from "@nestjs/common";
import { FriendshipService } from "./friendship.service";
import { UsersService } from "./users.service";
import { AuthService } from "../auth/auth.service";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { UserDto } from "src/common/mappers/user-to-dto";
import { FriendRequest } from "src/common/entities/friend-request.entity";
import { FriendRequestDto } from "src/common/mappers/friend-request-to-dto";

@ApiTags("Users")
@Controller("api/users")
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private friendshipService: FriendshipService
  ) {}

  @Get()
  @ApiResponse({ type: UserDto, isArray: true })
  async getUsers(@Request() req): Promise<UserDto[]> {
    return await this.friendshipService.getUsers(req);
  }

  @Get("friends")
  @ApiResponse({ type: UserDto, isArray: true })
  async getFriends(@Request() req): Promise<UserDto[]> {
    return await this.friendshipService.getFriends(req);
  }

  @Get("blocked-users")
  @ApiResponse({ type: UserDto, isArray: true })
  async getBlockedUsers(@Request() req): Promise<UserDto[]> {
    return await this.friendshipService.getBlockedUsers(req);
  }

  @Get("received-friend-requests")
  @ApiResponse({ type: FriendRequestDto, isArray: true })
  async getReceivedFriendRequests(@Request() req): Promise<FriendRequestDto[]> {
    return await this.friendshipService.getReceivedFriendRequests(req);
  }

  @Get("sent-friend-requests")
  @ApiResponse({ type: FriendRequestDto, isArray: true })
  async getSentFriendRequests(@Request() req): Promise<FriendRequestDto[]> {
    return await this.friendshipService.getSentFriendRequests(req);
  }

  @Post("friend-request/:receiverId")
  @HttpCode(201)
  @ApiResponse({ type: FriendRequestDto })
  async sendFriendRequest(
    @Request() req,
    @Param("receiverId") receiverId: number
  ): Promise<FriendRequestDto> {
    return await this.friendshipService.sendFriendRequest(req, receiverId);
  }

  @Post("accept-friend-request/:requestId")
  @HttpCode(201)
  async acceptFriendRequest(
    @Param("requestId") requestId: number,
    @Request() req
  ) {
    return await this.friendshipService.acceptFriendRequest(requestId, req);
  }

  @Delete("cancel-friend-request/:requestId")
  @HttpCode(204)
  async cancelFriendRequest(
    @Param("requestId") requestId: number,
    @Request() req
  ) {
    return await this.friendshipService.cancelFriendRequest(requestId, req);
  }

  @Delete("unfriend/:friendId")
  @HttpCode(204)
  async unfriend(@Param("friendId") friendId: number, @Request() req) {
    return await this.friendshipService.unfriend(friendId, req);
  }

  @Delete("block/:userToBlockId")
  @HttpCode(204)
  async block(@Param("userToBlockId") userToBlockId: number, @Request() req) {
    return await this.friendshipService.block(userToBlockId, req);
  }
}
