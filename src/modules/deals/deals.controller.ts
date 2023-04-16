import { Body, Controller, Get, Param, Post, Request } from "@nestjs/common";
import { Public } from "../auth/public.auth";
import { DealsService } from "./deals.service";
import { CreateTransactionDto } from "./dtos/create-transaction.dto";

@Controller("api/deals")
export class DealsController {
  constructor(private dealsService: DealsService) {}

  @Get()
  getDeals(@Request() req) {
    return this.dealsService.getDeals(req);
  }

  @Get("/user/:id")
  getDealsByUserId(@Request() req, @Param("id") id: number) {
    return this.dealsService.getDealsByUserId(req, id);
  }

  @Post()
  createTransaction(
    @Request() req,
    @Body() createtransactionDto: CreateTransactionDto
  ) {
    return this.dealsService.createTransaction(req, createtransactionDto);
  }
}
