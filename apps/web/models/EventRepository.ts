import prisma from "~/prisma";
import { Prisma } from "@prisma/client";
import { Log } from "alchemy-sdk";
import { Interface } from "ethers";

const BATCH_SIZE = 25000;

export default class EventRepository {
  static async createEventFromLog(log: Log, eventInterface: Interface) {
    const description = this.serializeLogDescription(log, eventInterface);
    const id = log.transactionHash + log.logIndex;
    const event = await prisma.event.create({
      data: {
        ...log,
        id,
        description,
        eventHash: log.topics[0],
      },
    });
    return event;
  }
  static async createEventsFromLogs(logs: Log[], eventInterface: Interface) {
    let counter = 0;
    let data = [];
    for (const log of logs) {
      const description = this.serializeLogDescription(log, eventInterface);
      const id = log.transactionHash + log.logIndex;
      data.push({
        ...log,
        id,
        description,
        eventHash: log.topics[0],
      });
      counter += 1;
      if (counter >= BATCH_SIZE) {
        await prisma.event.createMany({ data, skipDuplicates: true });
        counter = 0;
        data = [];
      }
    }
    await prisma.event.createMany({ data, skipDuplicates: true });
  }
  static async findLatest(query: Prisma.EventWhereInput) {
    return prisma.event.findFirst({
      where: query,
      orderBy: [{ blockNumber: "desc" }, { logIndex: "desc" }],
    });
  }
  private static serializeLogDescription(
    log: Log,
    eventInterface: Interface
  ): Prisma.InputJsonObject {
    const parsedLog = eventInterface.parseLog(log);
    return JSON.parse(
      JSON.stringify(parsedLog, (_, value) =>
        typeof value === "bigint" ? value.toString() : value
      )
    );
  }
}
