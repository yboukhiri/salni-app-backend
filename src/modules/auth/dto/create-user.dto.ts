import {
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsString,
  Length,
} from "class-validator";
import { Gender } from "src/common/enums/gender.enum";

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @Length(2, 255)
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @Length(2, 255)
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(8, 255)
  password: string;

  @IsNotEmpty()
  @IsInt()
  birthDay: number;

  @IsNotEmpty()
  @IsInt()
  birthMonth: number;

  @IsNotEmpty()
  @IsInt()
  birthYear: number;

  @IsNotEmpty()
  @IsEnum(Gender)
  gender: Gender;
}
