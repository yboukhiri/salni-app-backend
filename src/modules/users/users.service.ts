import { Injectable } from "@nestjs/common";
import { User } from "src/common/entities/user.entity";
import { CreateUserDto } from "../auth/dto/create-user.dto";

@Injectable()
export class UsersService {
  async getUsers() {
    return await User.find({
      relations: ["friends", "blockedUsers"],
    });
  }

  async getUserById(id: number) {
    const user = await User.findOne({
      where: { id },
      relations: [
        "friends",
        "blockedUsers",
        "sentFriendRequests",
        "receivedFriendRequests",
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

  async addRandomUser() {
    const user = new User();
    user.firstName = "John" + Math.random();
    user.lastName = "Doe" + Math.random();
    user.email = "john.doe" + Math.random() + "@gmail.com";
    return User.save(user);
  }
}
