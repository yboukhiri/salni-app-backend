import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ example: "john.doe@example.com" })
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: "password" })
  readonly password: string;
}
