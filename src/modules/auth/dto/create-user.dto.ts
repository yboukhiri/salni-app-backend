import {
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsString,
  Length,
} from "class-validator";
import { Gender } from "../../../common/enums/gender.enum";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @Length(2, 255)
  @ApiProperty({ example: "John" })
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @Length(2, 255)
  @ApiProperty({ example: "Doe" })
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  @Length(5, 255)
  @ApiProperty({ example: "john.doe@example.com" })
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(8, 255)
  @ApiProperty({ example: "password" })
  password: string;

  @IsNotEmpty()
  @IsInt()
  @ApiProperty({ example: 1 })
  birthDay: number;

  @IsNotEmpty()
  @IsInt()
  @ApiProperty({ example: 1 })
  birthMonth: number;

  @IsNotEmpty()
  @IsInt()
  @ApiProperty({ example: 1990 })
  birthYear: number;

  @IsNotEmpty()
  @IsEnum(Gender)
  @ApiProperty({ example: "male" })
  gender: Gender;
}
