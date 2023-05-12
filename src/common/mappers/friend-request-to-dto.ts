import { ApiProperty } from "@nestjs/swagger";
import { FriendRequest } from "../entities/friend-request.entity";

export class FriendRequestDto {
  @ApiProperty({ example: 1 })
  id: number;
  @ApiProperty({ example: 1 })
  senderId: number;
  @ApiProperty({ example: 2 })
  receiverId: number;
  @ApiProperty({ example: true })
  accepted: boolean;
  @ApiProperty({ example: false })
  cancelled: boolean;
  @ApiProperty({ example: "2021-01-01T00:00:00.000Z" })
  createdAt: Date;
}

export function friendRequestToDto(
  friendRequest: FriendRequest
): FriendRequestDto {
  return {
    id: friendRequest.id,
    senderId: friendRequest.senderId,
    receiverId: friendRequest.receiverId,
    accepted: friendRequest.accepted,
    cancelled: friendRequest.cancelled,
    createdAt: friendRequest.createdAt,
  };
}
