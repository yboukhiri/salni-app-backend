import { Controller, Get, Param } from '@nestjs/common';
import { FriendshipService } from './friendship.service';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private friendshipService: FriendshipService,
  ) {}

  @Get()
  getUsers() {
    return this.usersService.getUsers();
  }

  @Get('add')
  addRandomUser() {
    return this.usersService.addRandomUser();
  }

  @Get(':id')
  getUser(@Param('id') id: number) {
    return this.usersService.getUser(id);
  }

  @Get(':senderId/send-friend-request/:receiverId')
  sendFriendRequest(
    @Param('senderId') senderId: number,
    @Param('receiverId') receiverId: number,
  ) {
    return this.friendshipService.sendFriendRequest(senderId, receiverId);
  }

  @Get(':receiverId/accept-friend-request/:senderId')
  acceptFriendRequest(
    @Param('senderId') senderId: number,
    @Param('receiverId') receiverId: number,
  ) {
    return this.friendshipService.acceptFriendRequest(senderId, receiverId);
  }

  @Get(':senderId/cancel-friend-request/:receiverId')
  cancelFriendRequest(
    @Param('senderId') senderId: number,
    @Param('receiverId') receiverId: number,
  ) {
    return this.friendshipService.cancelFriendRequest(senderId, receiverId);
  }

  @Get(':senderId/unfriend/:receiverId')
  unfriend(
    @Param('senderId') senderId: number,
    @Param('receiverId') receiverId: number,
  ) {
    return this.friendshipService.unfriend(senderId, receiverId);
  }
}
