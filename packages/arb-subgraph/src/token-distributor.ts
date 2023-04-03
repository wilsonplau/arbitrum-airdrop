import { BigInt, Bytes } from "@graphprotocol/graph-ts";
import {
  CanClaim,
  HasClaimed,
} from "../generated/TokenDistributor/TokenDistributor";
import {
  CanClaimEvent,
  HasClaimedEvent,
  AirdropStats,
  AirdropClaim,
} from "../generated/schema";

let TOTAL_ID = "total";
let INCREMENT = BigInt.fromI32(1);

function _loadOrCreateTotalEntity(): AirdropStats {
  let totalEntity = AirdropStats.load(TOTAL_ID);
  if (totalEntity == null) {
    totalEntity = new AirdropStats(TOTAL_ID);
    totalEntity.totalAmount = BigInt.fromI32(0);
    totalEntity.totalClaimedAmount = BigInt.fromI32(0);
    totalEntity.totalRecipients = BigInt.fromI32(0);
    totalEntity.totalClaimedRecipients = BigInt.fromI32(0);
  }
  return totalEntity;
}

function _loadOrCreateAirdropClaimEntity(address: Bytes): AirdropClaim {
  let airdropClaimEntity = AirdropClaim.load(address);
  if (airdropClaimEntity == null) {
    airdropClaimEntity = new AirdropClaim(address);
    airdropClaimEntity.amount = BigInt.fromI32(0);
    airdropClaimEntity.claimedAmount = BigInt.fromI32(0);
    airdropClaimEntity.hasClaimed = false;
  }
  return airdropClaimEntity;
}

export function handleCanClaim(event: CanClaim): void {
  let eventEntity = new CanClaimEvent(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  eventEntity.recipient = event.params.recipient;
  eventEntity.amount = event.params.amount;
  eventEntity.blockNumber = event.block.number;
  eventEntity.blockTimestamp = event.block.timestamp;
  eventEntity.transactionHash = event.transaction.hash;
  eventEntity.save();

  let totalEntity = _loadOrCreateTotalEntity();
  totalEntity.totalAmount = totalEntity.totalAmount.plus(event.params.amount);
  totalEntity.totalRecipients = totalEntity.totalRecipients.plus(INCREMENT);
  totalEntity.save();

  let airdropClaimEntity = _loadOrCreateAirdropClaimEntity(
    event.params.recipient
  );
  airdropClaimEntity.amount = airdropClaimEntity.amount.plus(
    event.params.amount
  );
  airdropClaimEntity.save();
}

export function handleHasClaimed(event: HasClaimed): void {
  let eventEntity = new HasClaimedEvent(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  eventEntity.recipient = event.params.recipient;
  eventEntity.amount = event.params.amount;
  eventEntity.blockNumber = event.block.number;
  eventEntity.blockTimestamp = event.block.timestamp;
  eventEntity.transactionHash = event.transaction.hash;
  eventEntity.save();

  let totalEntity = _loadOrCreateTotalEntity();
  totalEntity.totalClaimedAmount = totalEntity.totalClaimedAmount.plus(
    event.params.amount
  );
  totalEntity.totalClaimedRecipients =
    totalEntity.totalClaimedRecipients.plus(INCREMENT);
  totalEntity.save();

  let airdropClaimEntity = _loadOrCreateAirdropClaimEntity(
    event.params.recipient
  );
  airdropClaimEntity.claimedAmount = airdropClaimEntity.claimedAmount.plus(
    event.params.amount
  );
  airdropClaimEntity.hasClaimed = true;
  airdropClaimEntity.save();
}
