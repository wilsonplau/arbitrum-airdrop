import {
  Transfer,
  DelegateVotesChanged,
} from "../generated/L2ArbitrumToken/L2ArbitrumToken";
import { TransferEvent, DelegateVotesChangedEvent } from "../generated/schema";
import {
  _loadOrCreateDailyTransferStat,
  _loadOrCreateDelegateVotesBalance,
  _loadOrCreateTokenBalance,
} from "./helpers";
import { INCREMENT } from "./constants";

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

  let tokenBalanceFrom = _loadOrCreateTokenBalance(event.params.from);
  tokenBalanceFrom.balance = tokenBalanceFrom.balance.minus(event.params.value);
  tokenBalanceFrom.save();

  let tokenBalanceTo = _loadOrCreateTokenBalance(event.params.to);
  tokenBalanceTo.balance = tokenBalanceTo.balance.plus(event.params.value);
  tokenBalanceTo.save();

  let dailyTransferStat = _loadOrCreateDailyTransferStat(event.block.timestamp);
  dailyTransferStat.totalTransfers =
    dailyTransferStat.totalTransfers.plus(INCREMENT);
  dailyTransferStat.totalTransfersAmount =
    dailyTransferStat.totalTransfersAmount.plus(event.params.value);
  dailyTransferStat.save();
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

  let delegateVotesBalance = _loadOrCreateDelegateVotesBalance(
    event.params.delegate
  );
  delegateVotesBalance.balance = event.params.newBalance;
  delegateVotesBalance.save();
}
