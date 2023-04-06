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

  let airdropStats = _loadOrCreateAirdropStat();
  airdropStats.totalAmount = airdropStats.totalAmount.plus(event.params.amount);
  airdropStats.totalRecipients = airdropStats.totalRecipients.plus(INCREMENT);
  airdropStats.save();

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

  let airdropStats = _loadOrCreateAirdropStat();
  airdropStats.totalClaimedAmount = airdropStats.totalClaimedAmount.plus(
    event.params.amount
  );
  airdropStats.totalClaimedRecipients =
    airdropStats.totalClaimedRecipients.plus(INCREMENT);
  airdropStats.save();

  let airdropClaim = _loadOrCreateAirdropClaim(event.params.recipient);
  airdropClaim.claimedAmount = airdropClaim.claimedAmount.plus(
    event.params.amount
  );
  airdropClaim.hasClaimed = true;
  airdropClaim.save();

  let cumulativeAirdropClaimStat = _loadOrCreateCumulativeAirdropClaimStat(
    event.block.timestamp
  );
  cumulativeAirdropClaimStat.totalAmount =
    cumulativeAirdropClaimStat.totalAmount.plus(event.params.amount);
  cumulativeAirdropClaimStat.totalRecipients =
    cumulativeAirdropClaimStat.totalRecipients.plus(INCREMENT);
  cumulativeAirdropClaimStat.save();
}
