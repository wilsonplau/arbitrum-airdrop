import {
  CanClaim,
  HasClaimed,
} from "../generated/TokenDistributor/TokenDistributor";
import { CanClaimEvent, HasClaimedEvent } from "../generated/schema";
import { INCREMENT } from "./constants";
import {
  _loadOrCreateAirdropStat,
  _loadOrCreateAirdropClaim,
  _loadOrCreateAirdropDistributionStat,
  _loadOrCreateCumulativeAirdropClaimStat,
  _loadOrCreateAirdropClaimStat,
} from "./helpers";

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

  let airdropStat = _loadOrCreateAirdropStat();
  airdropStat.totalAmount = airdropStat.totalAmount.plus(event.params.amount);
  airdropStat.totalRecipients = airdropStat.totalRecipients.plus(INCREMENT);
  airdropStat.save();

  let airdropDistributionStat = _loadOrCreateAirdropDistributionStat(
    event.params.amount
  );
  airdropDistributionStat.totalAmount =
    airdropDistributionStat.totalAmount.plus(event.params.amount);
  airdropDistributionStat.totalRecipients =
    airdropDistributionStat.totalRecipients.plus(INCREMENT);
  airdropDistributionStat.save();

  let airdropClaim = _loadOrCreateAirdropClaim(event.params.recipient);
  airdropClaim.amount = airdropClaim.amount.plus(event.params.amount);
  airdropClaim.save();
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

  let airdropStat = _loadOrCreateAirdropStat();
  airdropStat.totalClaimedAmount = airdropStat.totalClaimedAmount.plus(
    event.params.amount
  );
  airdropStat.totalClaimedRecipients =
    airdropStat.totalClaimedRecipients.plus(INCREMENT);
  airdropStat.save();

  let airdropClaim = _loadOrCreateAirdropClaim(event.params.recipient);
  airdropClaim.claimedAmount = airdropClaim.claimedAmount.plus(
    event.params.amount
  );
  airdropClaim.hasClaimed = true;
  airdropClaim.save();

  let cumulativeAirdropClaimStat = _loadOrCreateCumulativeAirdropClaimStat();
  cumulativeAirdropClaimStat.timestamp = event.block.timestamp.toI32();
  cumulativeAirdropClaimStat.totalAmount =
    cumulativeAirdropClaimStat.totalAmount.plus(event.params.amount);
  cumulativeAirdropClaimStat.totalRecipients =
    cumulativeAirdropClaimStat.totalRecipients.plus(INCREMENT);
  cumulativeAirdropClaimStat.save();

  let airdropClaimStat = _loadOrCreateAirdropClaimStat(event.block.timestamp);
  airdropClaimStat.totalAmount = cumulativeAirdropClaimStat.totalAmount;
  airdropClaimStat.totalRecipients = cumulativeAirdropClaimStat.totalRecipients;
  airdropClaimStat.save();
}
