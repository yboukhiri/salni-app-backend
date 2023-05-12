import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNumber } from "class-validator";
import { Currency } from "src/common/enums/currency.enum";

export class CreateTransactionDto {
  @IsNumber()
  @ApiProperty({ example: 1 })
  toUserId: number;
  @ApiProperty({ example: 100 })
  @IsNumber()
  amount: number;
  @IsEnum(Currency)
  @ApiProperty({ example: "USD" })
  currency: Currency;
}
