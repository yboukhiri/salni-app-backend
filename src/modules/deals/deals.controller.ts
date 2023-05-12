import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Request,
} from "@nestjs/common";
import { DealsService } from "./deals.service";
import { CreateTransactionDto } from "./dtos/create-transaction.dto";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { DealDto } from "src/common/mappers/deal-to-dto";

@ApiTags("Deals")
@Controller("api/deals")
export class DealsController {
  constructor(private dealsService: DealsService) {}

  @Get()
  @ApiResponse({ type: DealDto, isArray: true })
  async getDeals(@Request() req): Promise<DealDto[]> {
    return await this.dealsService.getDeals(req);
  }

  @Get("/user/:id")
  @ApiResponse({ type: DealDto })
  async getDealWithUserId(
    @Request() req,
    @Param("id") id: number
  ): Promise<DealDto> {
    return await this.dealsService.getDealWithUserId(req, id);
  }

  @Post()
  @HttpCode(201)
  async createTransaction(
    @Request() req,
    @Body() createtransactionDto: CreateTransactionDto
  ) {
    return await this.dealsService.createTransaction(req, createtransactionDto);
  }

  @Put("/:dealId/transactions/:transactionId/accept")
  async acceptTransaction(
    @Request() req,
    @Param("dealId") id: number,
    @Param("transactionId") transactionId: number
  ) {
    return await this.dealsService.acceptTransaction(req, id, transactionId);
  }
}
