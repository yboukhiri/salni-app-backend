import { Injectable } from "@nestjs/common";
import { Deal } from "src/common/entities/deal.entity";
import { Transaction } from "src/common/entities/transaction.entity";
import { User } from "src/common/entities/user.entity";
import { AuthService } from "../auth/auth.service";
import { FriendshipService } from "../users/friendship.service";
import { CreateTransactionDto } from "./dtos/create-transaction.dto";

@Injectable()
export class DealsService {
  constructor(
    private authService: AuthService,
    private friendshipService: FriendshipService
  ) {}

  async getDeals(req) {
    const user = await this.authService.getCurrentUser(req);
    return Deal.find({
      where: [{ userId1: user.id }, { userId2: user.id }],
      relations: ["transactions"],
    });
  }

  getDealsByUserId(req, userId: number) {
    const user = this.authService.getCurrentUser(req);
    return Deal.findOne({
      where: [{ userId1: userId }, { userId2: userId }],
      relations: ["transactions"],
    });
  }

  async createTransaction(req, createTransactionDto: CreateTransactionDto) {
    const user = await this.authService.getCurrentUser(req);
    // getting the data
    const fromUserId = user.id;
    const { toUserId, amount } = createTransactionDto;
    // aborting if the transaction cannot be made
    if (fromUserId === toUserId) {
      throw new Error("You cannot send money to yourself");
    } else if (amount < 0) {
      throw new Error("You cannot send negative amounts of money");
    } else if (await this.friendshipService.areBlocked(fromUserId, toUserId)) {
      throw new Error("User is inaccesible");
    }
    // if deal is already initiated, we just add the amount
    const deal = await Deal.findOne({
      where: [
        { userId1: fromUserId, userId2: toUserId },
        { userId1: toUserId, userId2: fromUserId },
      ],
      relations: ["transactions"],
    });
    if (deal) {
      let transaction = this.createTransactionFromParameters(
        deal,
        fromUserId,
        toUserId,
        amount
      );
      await Transaction.save(transaction);
      deal.transactions.push(transaction);
      await Deal.save(deal);
      // if deal is not initiated, we create a new deal if the users are friends
    } else {
      if (!(await this.friendshipService.areFriends(fromUserId, toUserId))) {
        throw new Error("User is not your friend");
      }
      let deal = new Deal();
      deal.userId1 = fromUserId;
      deal.userId2 = toUserId;
      let toUser = await User.findOne({ where: { id: toUserId } });
      deal.transactions = [];
      if (!user.deals) {
        user.deals = [];
      }
      if (!toUser.deals) {
        toUser.deals = [];
      }
      user.deals.push(deal);
      toUser.deals.push(deal);
      await Deal.save(deal);
      await User.save(user);
      await User.save(toUser);
      let transaction = this.createTransactionFromParameters(
        deal,
        fromUserId,
        toUserId,
        amount
      );
      await Transaction.save(transaction);
      deal.transactions.push(transaction);
      await Deal.save(deal);
    }
  }

  private createTransactionFromParameters(
    deal: Deal,
    fromUserId: number,
    toUserId: number,
    amount: number
  ) {
    let transaction = new Transaction();
    transaction.fromUserId = fromUserId;
    transaction.toUserId = toUserId;
    transaction.amount = amount;
    return transaction;
  }
}
