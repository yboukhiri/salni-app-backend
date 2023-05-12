import { ApiProperty } from "@nestjs/swagger";
import { Deal } from "../entities/deal.entity";
import { TransactionDto, transactionToDto } from "./transaction-to-dto";

export class DealDto {
  @ApiProperty({ example: 1 })
  id: number;
  @ApiProperty({ example: 1 })
  userId1: number;
  @ApiProperty({ example: 2 })
  userId2: number;
  @ApiProperty({ type: TransactionDto, isArray: true, example: [] })
  transactions?: TransactionDto[];
}

export function dealToDto(deal: Deal): DealDto {
  let dealDto = new DealDto();
  dealDto.id = deal.id;
  dealDto.userId1 = deal.userId1;
  dealDto.userId2 = deal.userId2;
  if (deal.transactions) {
    dealDto.transactions = deal.transactions.map((transaction) =>
      transactionToDto(transaction)
    );
  }
  return dealDto;
}
