import { Injectable } from "@nestjs/common";
import { Deal } from "src/common/entities/deal.entity";
import { Transaction } from "src/common/entities/transaction.entity";
import { User } from "src/common/entities/user.entity";
import { AuthService } from "../auth/auth.service";
import { FriendshipService } from "../users/friendship.service";
import { CreateTransactionDto } from "./dtos/create-transaction.dto";
import { Currency } from "src/common/enums/currency.enum";
import { InjectEntityManager } from "@nestjs/typeorm";
import { EntityManager } from "typeorm";
import { dealToDto } from "src/common/mappers/deal-to-dto";

@Injectable()
export class DealsService {
  constructor(
    private authService: AuthService,
    private friendshipService: FriendshipService,
    @InjectEntityManager() private readonly entityManager: EntityManager
  ) {}

  async getDeals(req) {
    const user = await this.authService.getCurrentUser(req);
    return await Deal.find({
      where: [{ userId1: user.id }, { userId2: user.id }],
      relations: ["transactions"],
    }).then((deals) => {
      return deals.map((deal) => {
        return dealToDto(deal);
      });
    });
  }

  async getDealWithUserId(req, userId: number) {
    const user = await this.authService.getCurrentUser(req);
    return Deal.findOne({
      where: [
        { userId1: user.id, userId2: userId },
        { userId1: userId, userId2: user.id },
      ],
      relations: ["transactions"],
    }).then((deal) => {
      if (deal) {
        return dealToDto(deal);
      } else {
        return null;
      }
    });
  }

  async createTransaction(req, createTransactionDto: CreateTransactionDto) {
    const user = await this.authService.getCurrentUser(req);
    // getting the data
    const fromUserId = user.id;
    const { toUserId, amount, currency } = createTransactionDto;
    // aborting if the transaction cannot be made
    if (fromUserId === toUserId) {
      throw new Error("You cannot send money to yourself");
    } else if (amount <= 0) {
      throw new Error("You cannot send negative or zero amount of money");
    } else if (await this.friendshipService.areBlocked(fromUserId, toUserId)) {
      throw new Error("User is inaccesible");
    }
    // if deal is already initiated, we just add the amount
    const deal = await Deal.findOne({
      where: [
        { userId1: fromUserId, userId2: toUserId },
        { userId1: toUserId, userId2: fromUserId },
      ],
      relations: ["transactions", "users"],
    });
    if (deal) {
      let transaction = this.createTransactionFromParameters(
        deal,
        fromUserId,
        toUserId,
        amount,
        currency
      );
      await this.entityManager.transaction(async (manager) => {
        await manager.save(Transaction, transaction);
        deal.transactions.push(transaction);
        await manager.save(Deal, deal);
      });
      // if deal is not initiated, we create a new deal if the users are friends
    } else {
      if (!(await this.friendshipService.areFriends(fromUserId, toUserId))) {
        throw new Error("User is not your friend");
      }
      let deal = new Deal();
      deal.userId1 = fromUserId;
      deal.userId2 = toUserId;
      let toUser = await User.findOne({
        where: { id: toUserId },
        relations: [
          "friends",
          "blockedUsers",
          "sentFriendRequests",
          "receivedFriendRequests",
          "deals",
        ],
      });
      deal.transactions = [];
      if (!user.deals) {
        user.deals = [];
      }
      if (!toUser.deals) {
        toUser.deals = [];
      }
      await this.entityManager.transaction(async (manager) => {
        user.deals.push(deal);
        toUser.deals.push(deal);
        await manager.save(Deal, deal);
        await manager.save(User, user);
        await manager.save(User, toUser);
        let transaction = this.createTransactionFromParameters(
          deal,
          fromUserId,
          toUserId,
          amount,
          currency
        );
        await manager.save(Transaction, transaction);
        deal.transactions.push(transaction);
        await manager.save(Deal, deal);
      });
    }
  }

  private createTransactionFromParameters(
    deal: Deal,
    fromUserId: number,
    toUserId: number,
    amount: number,
    currency: Currency
  ) {
    let transaction = new Transaction();
    transaction.deal = deal;
    transaction.fromUserId = fromUserId;
    transaction.toUserId = toUserId;
    transaction.amount = amount;
    transaction.currency = currency;
    return transaction;
  }

  async acceptTransaction(req, dealId: number, transactionId: number) {
    const user = await this.authService.getCurrentUser(req);
    const deal = await Deal.findOne({
      where: [
        { id: dealId, userId1: user.id },
        { id: dealId, userId2: user.id },
      ],
      relations: ["transactions", "users"],
    });
    if (!deal) {
      throw new Error("Deal not found");
    }
    const transaction = deal.transactions.find(
      (transaction) => transaction.id == transactionId
    );
    if (!transaction) {
      throw new Error("Transaction not found");
    }
    if (transaction.toUserId !== user.id) {
      throw new Error("You cannot accept this transaction");
    }
    if (transaction.accepted) {
      throw new Error("Transaction already accepted");
    }
    if (transaction.rejected) {
      throw new Error("Transaction already rejected");
    }
    transaction.accepted = true;
    await Transaction.save(transaction);
  }
}
