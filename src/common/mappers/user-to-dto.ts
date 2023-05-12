import { ApiProperty } from "@nestjs/swagger";
import { User } from "../entities/user.entity";

export class UserDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: "John" })
  firstName: string;

  @ApiProperty({ example: "Doe" })
  lastName: string;

  @ApiProperty({ example: "john.doe@example.com" })
  email: string;
}

export function userToDto(user: User): UserDto {
  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  };
}
