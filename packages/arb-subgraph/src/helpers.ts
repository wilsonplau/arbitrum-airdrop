import { BigInt, Bytes } from "@graphprotocol/graph-ts";
import {
  AirdropStats,
  AirdropClaim,
  AirdropDistributionStat,
  TokenBalance,
  DailyTransferStat,
  DelegateVotesBalance,
  CumulativeAirdropClaimStat,
} from "../generated/schema";
import { TOTAL_ID } from "./constants";

export function _timestampToDay(timestamp: BigInt): BigInt {
  return timestamp.div(BigInt.fromI32(86400)).times(BigInt.fromI32(86400));
}

export function _loadOrCreateAirdropStats(): AirdropStats {
  let total = AirdropStats.load(TOTAL_ID);
  if (total == null) {
    total = new AirdropStats(TOTAL_ID);
    total.totalAmount = BigInt.fromI32(0);
    total.totalClaimedAmount = BigInt.fromI32(0);
    total.totalRecipients = BigInt.fromI32(0);
    total.totalClaimedRecipients = BigInt.fromI32(0);
  }
  return total;
}

export function _loadOrCreateAirdropClaim(address: Bytes): AirdropClaim {
  let airdropClaim = AirdropClaim.load(address);
  if (airdropClaim == null) {
    airdropClaim = new AirdropClaim(address);
    airdropClaim.amount = BigInt.fromI32(0);
    airdropClaim.claimedAmount = BigInt.fromI32(0);
    airdropClaim.hasClaimed = false;
  }
  return airdropClaim;
}

export function _loadOrCreateAirdropDistributionStat(
  amount: BigInt
): AirdropDistributionStat {
  let airdropDistributionStat = AirdropDistributionStat.load(amount.toString());
  if (airdropDistributionStat == null) {
    airdropDistributionStat = new AirdropDistributionStat(amount.toString());
    airdropDistributionStat.amount = amount;
    airdropDistributionStat.totalAmount = BigInt.fromI32(0);
    airdropDistributionStat.totalRecipients = BigInt.fromI32(0);
  }
  return airdropDistributionStat;
}

export function _loadOrCreateTokenBalance(address: Bytes): TokenBalance {
  let tokenBalance = TokenBalance.load(address);
  if (tokenBalance == null) {
    tokenBalance = new TokenBalance(address);
    tokenBalance.address = address;
    tokenBalance.balance = BigInt.fromI32(0);
  }
  return tokenBalance;
}

export function _loadOrCreateDailyTransferStat(
  blockTimestamp: BigInt
): DailyTransferStat {
  let day = _timestampToDay(blockTimestamp);
  let dailyTransferStat = DailyTransferStat.load(day.toString());
  if (dailyTransferStat == null) {
    dailyTransferStat = new DailyTransferStat(day.toString());
    dailyTransferStat.timestamp = day.toI32();
    dailyTransferStat.totalTransfers = BigInt.fromI32(0);
    dailyTransferStat.totalTransfersAmount = BigInt.fromI32(0);
  }
  return dailyTransferStat;
}

export function _loadOrCreateDelegateVotesBalance(
  address: Bytes
): DelegateVotesBalance {
  let delegateVotesBalance = DelegateVotesBalance.load(address);
  if (delegateVotesBalance == null) {
    delegateVotesBalance = new DelegateVotesBalance(address);
    delegateVotesBalance.address = address;
    delegateVotesBalance.balance = BigInt.fromI32(0);
  }
  return delegateVotesBalance;
}

export function _loadOrCreateCumulativeAirdropClaimStat(
  blockTimestamp: BigInt
): CumulativeAirdropClaimStat {
  let day = _timestampToDay(blockTimestamp);
  let cumulativeAirdropClaimStat = CumulativeAirdropClaimStat.load(
    day.toString()
  );
  if (cumulativeAirdropClaimStat == null) {
    cumulativeAirdropClaimStat = new CumulativeAirdropClaimStat(day.toString());
    cumulativeAirdropClaimStat.timestamp = day.toI32();
    cumulativeAirdropClaimStat.totalAmount = BigInt.fromI32(0);
    cumulativeAirdropClaimStat.totalRecipients = BigInt.fromI32(0);
  }
  return cumulativeAirdropClaimStat;
}
