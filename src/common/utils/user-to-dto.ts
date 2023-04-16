import { User } from "../entities/user.entity";

export interface UserDto {
  id: number;
  firstName: string;
  lastName: string;
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
