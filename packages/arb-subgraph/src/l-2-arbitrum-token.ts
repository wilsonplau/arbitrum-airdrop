import { BigInt, Bytes } from "@graphprotocol/graph-ts";
import {
  Transfer,
  DelegateVotesChanged,
} from "../generated/L2ArbitrumToken/L2ArbitrumToken";
import {
  TransferEvent,
  TokenBalance,
  DailyTransferStat,
  DelegateVotesChangedEvent,
  DelegateVotesBalance,
} from "../generated/schema";

let INCREMENT = BigInt.fromI32(1);

function _timestampToDay(timestamp: BigInt): BigInt {
  return timestamp.div(BigInt.fromI32(86400)).times(BigInt.fromI32(86400));
}

function _loadOrCreateTokenBalanceEntity(address: Bytes): TokenBalance {
  let tokenBalanceEntity = TokenBalance.load(address);
  if (tokenBalanceEntity == null) {
    tokenBalanceEntity = new TokenBalance(address);
    tokenBalanceEntity.address = address;
    tokenBalanceEntity.balance = BigInt.fromI32(0);
  }
  return tokenBalanceEntity;
}

function _loadOrCreateDailyTransferStat(timestamp: BigInt): DailyTransferStat {
  let day = _timestampToDay(timestamp);
  let dailyTransferStatEntity = DailyTransferStat.load(day.toString());
  if (dailyTransferStatEntity == null) {
    dailyTransferStatEntity = new DailyTransferStat(day.toString());
    dailyTransferStatEntity.timestamp = day.toI32();
    dailyTransferStatEntity.totalTransfers = BigInt.fromI32(0);
    dailyTransferStatEntity.totalTransfersAmount = BigInt.fromI32(0);
  }
  return dailyTransferStatEntity;
}

function _loadOrCreateDelegateVotesBalanceEntity(
  address: Bytes
): DelegateVotesBalance {
  let delegateVotesBalanceEntity = DelegateVotesBalance.load(address);
  if (delegateVotesBalanceEntity == null) {
    delegateVotesBalanceEntity = new DelegateVotesBalance(address);
    delegateVotesBalanceEntity.address = address;
    delegateVotesBalanceEntity.balance = BigInt.fromI32(0);
  }
  return delegateVotesBalanceEntity;
}

export function handleTransfer(event: Transfer): void {
  let eventEntity = new TransferEvent(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  eventEntity.from = event.params.from;
  eventEntity.to = event.params.to;
  eventEntity.value = event.params.value;
  eventEntity.blockNumber = event.block.number;
  eventEntity.blockTimestamp = event.block.timestamp;
  eventEntity.transactionHash = event.transaction.hash;
  eventEntity.save();

  let tokenBalanceEntityFrom = _loadOrCreateTokenBalanceEntity(
    event.params.from
  );
  tokenBalanceEntityFrom.balance = tokenBalanceEntityFrom.balance.minus(
    event.params.value
  );
  tokenBalanceEntityFrom.save();

  let tokenBalanceEntityTo = _loadOrCreateTokenBalanceEntity(event.params.to);
  tokenBalanceEntityTo.balance = tokenBalanceEntityTo.balance.plus(
    event.params.value
  );
  tokenBalanceEntityTo.save();

  let day = _timestampToDay(event.block.timestamp);
  let dailyTransferStatEntity = _loadOrCreateDailyTransferStat(day);
  dailyTransferStatEntity.totalTransfers =
    dailyTransferStatEntity.totalTransfers.plus(INCREMENT);
  dailyTransferStatEntity.totalTransfersAmount =
    dailyTransferStatEntity.totalTransfersAmount.plus(event.params.value);
  dailyTransferStatEntity.save();
}

export function handleDelegateVotesChanged(event: DelegateVotesChanged): void {
  let eventEntity = new DelegateVotesChangedEvent(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  eventEntity.delegate = event.params.delegate;
  eventEntity.previousBalance = event.params.previousBalance;
  eventEntity.newBalance = event.params.newBalance;
  eventEntity.blockNumber = event.block.number;
  eventEntity.blockTimestamp = event.block.timestamp;
  eventEntity.transactionHash = event.transaction.hash;
  eventEntity.save();

  let delegateVotesBalanceEntity = _loadOrCreateDelegateVotesBalanceEntity(
    event.params.delegate
  );
  delegateVotesBalanceEntity.balance = event.params.newBalance;
  delegateVotesBalanceEntity.save();
}
