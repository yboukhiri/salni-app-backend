import { Injectable } from "@nestjs/common";
import { User } from "../../common/entities/user.entity";
import { CreateUserDto } from "../auth/dto/create-user.dto";
import { userToDto } from "src/common/mappers/user-to-dto";
import { AuthService } from "../auth/auth.service";
import { FriendshipService } from "./friendship.service";

@Injectable()
export class UsersService {
  constructor() {}

  async getUserById(id: number) {
    const user = await User.findOne({
      where: { id },
      relations: [
        "friends",
        "blockedUsers",
        "sentFriendRequests",
        "receivedFriendRequests",
        "deals",
      ],
    });
    if (!user) {
      throw new Error("User does not exist");
    }
    return user;
  }

  getUserByEmail(username: string) {
    return User.findOne({
      where: { email: username },
      relations: [
        "friends",
        "blockedUsers",
        "sentFriendRequests",
        "receivedFriendRequests",
      ],
    });
  }

  async createUser(createUserDto: CreateUserDto) {
    const user = new User();
    user.firstName = createUserDto.firstName;
    user.lastName = createUserDto.lastName;
    user.email = createUserDto.email;
    user.password = createUserDto.password;
    user.birthDay = createUserDto.birthDay;
    user.birthMonth = createUserDto.birthMonth;
    user.birthYear = createUserDto.birthYear;
    user.gender = createUserDto.gender;
    return await User.save(user);
  }

  async deleteUser(id: number) {
    const user = await this.getUserById(id);
    return await User.remove(user);
  }
}
