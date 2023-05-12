import { ApiProperty } from "@nestjs/swagger";
import { Currency } from "../enums/currency.enum";

export class TransactionDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 1 })
  fromUserId: number;

  @ApiProperty({ example: 2 })
  toUserId: number;

  @ApiProperty({ example: 100 })
  amount: number;

  @ApiProperty({ example: "USD" })
  currency: Currency;

  @ApiProperty({ example: "2023-01-01T00:00:00.000Z" })
  createdAt: Date;

  @ApiProperty({ example: true })
  accepted: boolean;

  @ApiProperty({ example: false })
  rejected: boolean;

  @ApiProperty({ example: "2023-01-02T00:00:00.000Z" })
  acceptedAt: Date;

  @ApiProperty({ example: "2023-01-01T00:00:00.000Z" })
  rejectedAt: Date;
}

export function transactionToDto(transaction): TransactionDto {
  let transactionDto = new TransactionDto();
  transactionDto.id = transaction.id;
  transactionDto.fromUserId = transaction.fromUserId;
  transactionDto.toUserId = transaction.toUserId;
  transactionDto.amount = transaction.amount;
  transactionDto.currency = transaction.currency;
  transactionDto.createdAt = transaction.createdAt;
  transactionDto.accepted = transaction.accepted;
  transactionDto.rejected = transaction.rejected;
  transactionDto.acceptedAt = transaction.acceptedAt;
  transactionDto.rejectedAt = transaction.rejectedAt;
  return transactionDto;
}
