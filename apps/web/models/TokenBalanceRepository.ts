import prisma from "~/prisma";
import { Prisma } from "@prisma/client";

export default class TokenBalanceRepository {
  static async create(data: Prisma.TokenBalanceCreateInput) {
    return prisma.tokenBalance.create({ data });
  }
  static async get(address: string) {
    return prisma.tokenBalance.findUnique({ where: { address } });
  }
  static async update(address: string, data: Prisma.TokenBalanceUpdateInput) {
    return prisma.tokenBalance.update({ where: { address }, data });
  }
}
