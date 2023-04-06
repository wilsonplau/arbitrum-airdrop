/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BigDecimal: any;
  BigInt: any;
  Bytes: any;
};

export type AirdropClaim = {
  __typename?: 'AirdropClaim';
  amount: Scalars['BigInt'];
  claimedAmount: Scalars['BigInt'];
  hasClaimed: Scalars['Boolean'];
  id: Scalars['Bytes'];
};

export type AirdropClaim_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  amount?: InputMaybe<Scalars['BigInt']>;
  amount_gt?: InputMaybe<Scalars['BigInt']>;
  amount_gte?: InputMaybe<Scalars['BigInt']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amount_lt?: InputMaybe<Scalars['BigInt']>;
  amount_lte?: InputMaybe<Scalars['BigInt']>;
  amount_not?: InputMaybe<Scalars['BigInt']>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  and?: InputMaybe<Array<InputMaybe<AirdropClaim_Filter>>>;
  claimedAmount?: InputMaybe<Scalars['BigInt']>;
  claimedAmount_gt?: InputMaybe<Scalars['BigInt']>;
  claimedAmount_gte?: InputMaybe<Scalars['BigInt']>;
  claimedAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  claimedAmount_lt?: InputMaybe<Scalars['BigInt']>;
  claimedAmount_lte?: InputMaybe<Scalars['BigInt']>;
  claimedAmount_not?: InputMaybe<Scalars['BigInt']>;
  claimedAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  hasClaimed?: InputMaybe<Scalars['Boolean']>;
  hasClaimed_in?: InputMaybe<Array<Scalars['Boolean']>>;
  hasClaimed_not?: InputMaybe<Scalars['Boolean']>;
  hasClaimed_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  id?: InputMaybe<Scalars['Bytes']>;
  id_contains?: InputMaybe<Scalars['Bytes']>;
  id_gt?: InputMaybe<Scalars['Bytes']>;
  id_gte?: InputMaybe<Scalars['Bytes']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_lt?: InputMaybe<Scalars['Bytes']>;
  id_lte?: InputMaybe<Scalars['Bytes']>;
  id_not?: InputMaybe<Scalars['Bytes']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  or?: InputMaybe<Array<InputMaybe<AirdropClaim_Filter>>>;
};

export enum AirdropClaim_OrderBy {
  Amount = 'amount',
  ClaimedAmount = 'claimedAmount',
  HasClaimed = 'hasClaimed',
  Id = 'id'
}

export type AirdropDistributionStat = {
  __typename?: 'AirdropDistributionStat';
  amount: Scalars['BigInt'];
  id: Scalars['ID'];
  totalAmount: Scalars['BigInt'];
  totalRecipients: Scalars['BigInt'];
};

export type AirdropDistributionStat_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  amount?: InputMaybe<Scalars['BigInt']>;
  amount_gt?: InputMaybe<Scalars['BigInt']>;
  amount_gte?: InputMaybe<Scalars['BigInt']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amount_lt?: InputMaybe<Scalars['BigInt']>;
  amount_lte?: InputMaybe<Scalars['BigInt']>;
  amount_not?: InputMaybe<Scalars['BigInt']>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  and?: InputMaybe<Array<InputMaybe<AirdropDistributionStat_Filter>>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  or?: InputMaybe<Array<InputMaybe<AirdropDistributionStat_Filter>>>;
  totalAmount?: InputMaybe<Scalars['BigInt']>;
  totalAmount_gt?: InputMaybe<Scalars['BigInt']>;
  totalAmount_gte?: InputMaybe<Scalars['BigInt']>;
  totalAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalAmount_lt?: InputMaybe<Scalars['BigInt']>;
  totalAmount_lte?: InputMaybe<Scalars['BigInt']>;
  totalAmount_not?: InputMaybe<Scalars['BigInt']>;
  totalAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalRecipients?: InputMaybe<Scalars['BigInt']>;
  totalRecipients_gt?: InputMaybe<Scalars['BigInt']>;
  totalRecipients_gte?: InputMaybe<Scalars['BigInt']>;
  totalRecipients_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalRecipients_lt?: InputMaybe<Scalars['BigInt']>;
  totalRecipients_lte?: InputMaybe<Scalars['BigInt']>;
  totalRecipients_not?: InputMaybe<Scalars['BigInt']>;
  totalRecipients_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};

export enum AirdropDistributionStat_OrderBy {
  Amount = 'amount',
  Id = 'id',
  TotalAmount = 'totalAmount',
  TotalRecipients = 'totalRecipients'
}

export type AirdropStats = {
  __typename?: 'AirdropStats';
  id: Scalars['ID'];
  totalAmount: Scalars['BigInt'];
  totalClaimedAmount: Scalars['BigInt'];
  totalClaimedRecipients: Scalars['BigInt'];
  totalRecipients: Scalars['BigInt'];
};

export type AirdropStats_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<AirdropStats_Filter>>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  or?: InputMaybe<Array<InputMaybe<AirdropStats_Filter>>>;
  totalAmount?: InputMaybe<Scalars['BigInt']>;
  totalAmount_gt?: InputMaybe<Scalars['BigInt']>;
  totalAmount_gte?: InputMaybe<Scalars['BigInt']>;
  totalAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalAmount_lt?: InputMaybe<Scalars['BigInt']>;
  totalAmount_lte?: InputMaybe<Scalars['BigInt']>;
  totalAmount_not?: InputMaybe<Scalars['BigInt']>;
  totalAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalClaimedAmount?: InputMaybe<Scalars['BigInt']>;
  totalClaimedAmount_gt?: InputMaybe<Scalars['BigInt']>;
  totalClaimedAmount_gte?: InputMaybe<Scalars['BigInt']>;
  totalClaimedAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalClaimedAmount_lt?: InputMaybe<Scalars['BigInt']>;
  totalClaimedAmount_lte?: InputMaybe<Scalars['BigInt']>;
  totalClaimedAmount_not?: InputMaybe<Scalars['BigInt']>;
  totalClaimedAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalClaimedRecipients?: InputMaybe<Scalars['BigInt']>;
  totalClaimedRecipients_gt?: InputMaybe<Scalars['BigInt']>;
  totalClaimedRecipients_gte?: InputMaybe<Scalars['BigInt']>;
  totalClaimedRecipients_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalClaimedRecipients_lt?: InputMaybe<Scalars['BigInt']>;
  totalClaimedRecipients_lte?: InputMaybe<Scalars['BigInt']>;
  totalClaimedRecipients_not?: InputMaybe<Scalars['BigInt']>;
  totalClaimedRecipients_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalRecipients?: InputMaybe<Scalars['BigInt']>;
  totalRecipients_gt?: InputMaybe<Scalars['BigInt']>;
  totalRecipients_gte?: InputMaybe<Scalars['BigInt']>;
  totalRecipients_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalRecipients_lt?: InputMaybe<Scalars['BigInt']>;
  totalRecipients_lte?: InputMaybe<Scalars['BigInt']>;
  totalRecipients_not?: InputMaybe<Scalars['BigInt']>;
  totalRecipients_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};

export enum AirdropStats_OrderBy {
  Id = 'id',
  TotalAmount = 'totalAmount',
  TotalClaimedAmount = 'totalClaimedAmount',
  TotalClaimedRecipients = 'totalClaimedRecipients',
  TotalRecipients = 'totalRecipients'
}

export type BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type Block_Height = {
  hash?: InputMaybe<Scalars['Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type CanClaimEvent = {
  __typename?: 'CanClaimEvent';
  amount: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
  blockTimestamp: Scalars['BigInt'];
  id: Scalars['Bytes'];
  recipient: Scalars['Bytes'];
  transactionHash: Scalars['Bytes'];
};

export type CanClaimEvent_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  amount?: InputMaybe<Scalars['BigInt']>;
  amount_gt?: InputMaybe<Scalars['BigInt']>;
  amount_gte?: InputMaybe<Scalars['BigInt']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amount_lt?: InputMaybe<Scalars['BigInt']>;
  amount_lte?: InputMaybe<Scalars['BigInt']>;
  amount_not?: InputMaybe<Scalars['BigInt']>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  and?: InputMaybe<Array<InputMaybe<CanClaimEvent_Filter>>>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  id?: InputMaybe<Scalars['Bytes']>;
  id_contains?: InputMaybe<Scalars['Bytes']>;
  id_gt?: InputMaybe<Scalars['Bytes']>;
  id_gte?: InputMaybe<Scalars['Bytes']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_lt?: InputMaybe<Scalars['Bytes']>;
  id_lte?: InputMaybe<Scalars['Bytes']>;
  id_not?: InputMaybe<Scalars['Bytes']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  or?: InputMaybe<Array<InputMaybe<CanClaimEvent_Filter>>>;
  recipient?: InputMaybe<Scalars['Bytes']>;
  recipient_contains?: InputMaybe<Scalars['Bytes']>;
  recipient_gt?: InputMaybe<Scalars['Bytes']>;
  recipient_gte?: InputMaybe<Scalars['Bytes']>;
  recipient_in?: InputMaybe<Array<Scalars['Bytes']>>;
  recipient_lt?: InputMaybe<Scalars['Bytes']>;
  recipient_lte?: InputMaybe<Scalars['Bytes']>;
  recipient_not?: InputMaybe<Scalars['Bytes']>;
  recipient_not_contains?: InputMaybe<Scalars['Bytes']>;
  recipient_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
};

export enum CanClaimEvent_OrderBy {
  Amount = 'amount',
  BlockNumber = 'blockNumber',
  BlockTimestamp = 'blockTimestamp',
  Id = 'id',
  Recipient = 'recipient',
  TransactionHash = 'transactionHash'
}

export type CumulativeAirdropClaimStat = {
  __typename?: 'CumulativeAirdropClaimStat';
  id: Scalars['ID'];
  timestamp: Scalars['Int'];
  totalAmount: Scalars['BigInt'];
  totalRecipients: Scalars['BigInt'];
};

export type CumulativeAirdropClaimStat_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<CumulativeAirdropClaimStat_Filter>>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  or?: InputMaybe<Array<InputMaybe<CumulativeAirdropClaimStat_Filter>>>;
  timestamp?: InputMaybe<Scalars['Int']>;
  timestamp_gt?: InputMaybe<Scalars['Int']>;
  timestamp_gte?: InputMaybe<Scalars['Int']>;
  timestamp_in?: InputMaybe<Array<Scalars['Int']>>;
  timestamp_lt?: InputMaybe<Scalars['Int']>;
  timestamp_lte?: InputMaybe<Scalars['Int']>;
  timestamp_not?: InputMaybe<Scalars['Int']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['Int']>>;
  totalAmount?: InputMaybe<Scalars['BigInt']>;
  totalAmount_gt?: InputMaybe<Scalars['BigInt']>;
  totalAmount_gte?: InputMaybe<Scalars['BigInt']>;
  totalAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalAmount_lt?: InputMaybe<Scalars['BigInt']>;
  totalAmount_lte?: InputMaybe<Scalars['BigInt']>;
  totalAmount_not?: InputMaybe<Scalars['BigInt']>;
  totalAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalRecipients?: InputMaybe<Scalars['BigInt']>;
  totalRecipients_gt?: InputMaybe<Scalars['BigInt']>;
  totalRecipients_gte?: InputMaybe<Scalars['BigInt']>;
  totalRecipients_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalRecipients_lt?: InputMaybe<Scalars['BigInt']>;
  totalRecipients_lte?: InputMaybe<Scalars['BigInt']>;
  totalRecipients_not?: InputMaybe<Scalars['BigInt']>;
  totalRecipients_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};

export enum CumulativeAirdropClaimStat_OrderBy {
  Id = 'id',
  Timestamp = 'timestamp',
  TotalAmount = 'totalAmount',
  TotalRecipients = 'totalRecipients'
}

export type DailyTransferStat = {
  __typename?: 'DailyTransferStat';
  id: Scalars['ID'];
  timestamp: Scalars['Int'];
  totalTransfers: Scalars['BigInt'];
  totalTransfersAmount: Scalars['BigInt'];
};

export type DailyTransferStat_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<DailyTransferStat_Filter>>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  or?: InputMaybe<Array<InputMaybe<DailyTransferStat_Filter>>>;
  timestamp?: InputMaybe<Scalars['Int']>;
  timestamp_gt?: InputMaybe<Scalars['Int']>;
  timestamp_gte?: InputMaybe<Scalars['Int']>;
  timestamp_in?: InputMaybe<Array<Scalars['Int']>>;
  timestamp_lt?: InputMaybe<Scalars['Int']>;
  timestamp_lte?: InputMaybe<Scalars['Int']>;
  timestamp_not?: InputMaybe<Scalars['Int']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['Int']>>;
  totalTransfers?: InputMaybe<Scalars['BigInt']>;
  totalTransfersAmount?: InputMaybe<Scalars['BigInt']>;
  totalTransfersAmount_gt?: InputMaybe<Scalars['BigInt']>;
  totalTransfersAmount_gte?: InputMaybe<Scalars['BigInt']>;
  totalTransfersAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalTransfersAmount_lt?: InputMaybe<Scalars['BigInt']>;
  totalTransfersAmount_lte?: InputMaybe<Scalars['BigInt']>;
  totalTransfersAmount_not?: InputMaybe<Scalars['BigInt']>;
  totalTransfersAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalTransfers_gt?: InputMaybe<Scalars['BigInt']>;
  totalTransfers_gte?: InputMaybe<Scalars['BigInt']>;
  totalTransfers_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalTransfers_lt?: InputMaybe<Scalars['BigInt']>;
  totalTransfers_lte?: InputMaybe<Scalars['BigInt']>;
  totalTransfers_not?: InputMaybe<Scalars['BigInt']>;
  totalTransfers_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};

export enum DailyTransferStat_OrderBy {
  Id = 'id',
  Timestamp = 'timestamp',
  TotalTransfers = 'totalTransfers',
  TotalTransfersAmount = 'totalTransfersAmount'
}

export type DelegateVotesBalance = {
  __typename?: 'DelegateVotesBalance';
  address: Scalars['Bytes'];
  balance: Scalars['BigInt'];
  id: Scalars['Bytes'];
};

export type DelegateVotesBalance_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  address?: InputMaybe<Scalars['Bytes']>;
  address_contains?: InputMaybe<Scalars['Bytes']>;
  address_gt?: InputMaybe<Scalars['Bytes']>;
  address_gte?: InputMaybe<Scalars['Bytes']>;
  address_in?: InputMaybe<Array<Scalars['Bytes']>>;
  address_lt?: InputMaybe<Scalars['Bytes']>;
  address_lte?: InputMaybe<Scalars['Bytes']>;
  address_not?: InputMaybe<Scalars['Bytes']>;
  address_not_contains?: InputMaybe<Scalars['Bytes']>;
  address_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  and?: InputMaybe<Array<InputMaybe<DelegateVotesBalance_Filter>>>;
  balance?: InputMaybe<Scalars['BigInt']>;
  balance_gt?: InputMaybe<Scalars['BigInt']>;
  balance_gte?: InputMaybe<Scalars['BigInt']>;
  balance_in?: InputMaybe<Array<Scalars['BigInt']>>;
  balance_lt?: InputMaybe<Scalars['BigInt']>;
  balance_lte?: InputMaybe<Scalars['BigInt']>;
  balance_not?: InputMaybe<Scalars['BigInt']>;
  balance_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  id?: InputMaybe<Scalars['Bytes']>;
  id_contains?: InputMaybe<Scalars['Bytes']>;
  id_gt?: InputMaybe<Scalars['Bytes']>;
  id_gte?: InputMaybe<Scalars['Bytes']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_lt?: InputMaybe<Scalars['Bytes']>;
  id_lte?: InputMaybe<Scalars['Bytes']>;
  id_not?: InputMaybe<Scalars['Bytes']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  or?: InputMaybe<Array<InputMaybe<DelegateVotesBalance_Filter>>>;
};

export enum DelegateVotesBalance_OrderBy {
  Address = 'address',
  Balance = 'balance',
  Id = 'id'
}

export type DelegateVotesChangedEvent = {
  __typename?: 'DelegateVotesChangedEvent';
  blockNumber: Scalars['BigInt'];
  blockTimestamp: Scalars['BigInt'];
  delegate: Scalars['Bytes'];
  id: Scalars['Bytes'];
  newBalance: Scalars['BigInt'];
  previousBalance: Scalars['BigInt'];
  transactionHash: Scalars['Bytes'];
};

export type DelegateVotesChangedEvent_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<DelegateVotesChangedEvent_Filter>>>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  delegate?: InputMaybe<Scalars['Bytes']>;
  delegate_contains?: InputMaybe<Scalars['Bytes']>;
  delegate_gt?: InputMaybe<Scalars['Bytes']>;
  delegate_gte?: InputMaybe<Scalars['Bytes']>;
  delegate_in?: InputMaybe<Array<Scalars['Bytes']>>;
  delegate_lt?: InputMaybe<Scalars['Bytes']>;
  delegate_lte?: InputMaybe<Scalars['Bytes']>;
  delegate_not?: InputMaybe<Scalars['Bytes']>;
  delegate_not_contains?: InputMaybe<Scalars['Bytes']>;
  delegate_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id?: InputMaybe<Scalars['Bytes']>;
  id_contains?: InputMaybe<Scalars['Bytes']>;
  id_gt?: InputMaybe<Scalars['Bytes']>;
  id_gte?: InputMaybe<Scalars['Bytes']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_lt?: InputMaybe<Scalars['Bytes']>;
  id_lte?: InputMaybe<Scalars['Bytes']>;
  id_not?: InputMaybe<Scalars['Bytes']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  newBalance?: InputMaybe<Scalars['BigInt']>;
  newBalance_gt?: InputMaybe<Scalars['BigInt']>;
  newBalance_gte?: InputMaybe<Scalars['BigInt']>;
  newBalance_in?: InputMaybe<Array<Scalars['BigInt']>>;
  newBalance_lt?: InputMaybe<Scalars['BigInt']>;
  newBalance_lte?: InputMaybe<Scalars['BigInt']>;
  newBalance_not?: InputMaybe<Scalars['BigInt']>;
  newBalance_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  or?: InputMaybe<Array<InputMaybe<DelegateVotesChangedEvent_Filter>>>;
  previousBalance?: InputMaybe<Scalars['BigInt']>;
  previousBalance_gt?: InputMaybe<Scalars['BigInt']>;
  previousBalance_gte?: InputMaybe<Scalars['BigInt']>;
  previousBalance_in?: InputMaybe<Array<Scalars['BigInt']>>;
  previousBalance_lt?: InputMaybe<Scalars['BigInt']>;
  previousBalance_lte?: InputMaybe<Scalars['BigInt']>;
  previousBalance_not?: InputMaybe<Scalars['BigInt']>;
  previousBalance_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
};

export enum DelegateVotesChangedEvent_OrderBy {
  BlockNumber = 'blockNumber',
  BlockTimestamp = 'blockTimestamp',
  Delegate = 'delegate',
  Id = 'id',
  NewBalance = 'newBalance',
  PreviousBalance = 'previousBalance',
  TransactionHash = 'transactionHash'
}

export type HasClaimedEvent = {
  __typename?: 'HasClaimedEvent';
  amount: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
  blockTimestamp: Scalars['BigInt'];
  id: Scalars['Bytes'];
  recipient: Scalars['Bytes'];
  transactionHash: Scalars['Bytes'];
};

export type HasClaimedEvent_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  amount?: InputMaybe<Scalars['BigInt']>;
  amount_gt?: InputMaybe<Scalars['BigInt']>;
  amount_gte?: InputMaybe<Scalars['BigInt']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amount_lt?: InputMaybe<Scalars['BigInt']>;
  amount_lte?: InputMaybe<Scalars['BigInt']>;
  amount_not?: InputMaybe<Scalars['BigInt']>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  and?: InputMaybe<Array<InputMaybe<HasClaimedEvent_Filter>>>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  id?: InputMaybe<Scalars['Bytes']>;
  id_contains?: InputMaybe<Scalars['Bytes']>;
  id_gt?: InputMaybe<Scalars['Bytes']>;
  id_gte?: InputMaybe<Scalars['Bytes']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_lt?: InputMaybe<Scalars['Bytes']>;
  id_lte?: InputMaybe<Scalars['Bytes']>;
  id_not?: InputMaybe<Scalars['Bytes']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  or?: InputMaybe<Array<InputMaybe<HasClaimedEvent_Filter>>>;
  recipient?: InputMaybe<Scalars['Bytes']>;
  recipient_contains?: InputMaybe<Scalars['Bytes']>;
  recipient_gt?: InputMaybe<Scalars['Bytes']>;
  recipient_gte?: InputMaybe<Scalars['Bytes']>;
  recipient_in?: InputMaybe<Array<Scalars['Bytes']>>;
  recipient_lt?: InputMaybe<Scalars['Bytes']>;
  recipient_lte?: InputMaybe<Scalars['Bytes']>;
  recipient_not?: InputMaybe<Scalars['Bytes']>;
  recipient_not_contains?: InputMaybe<Scalars['Bytes']>;
  recipient_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
};

export enum HasClaimedEvent_OrderBy {
  Amount = 'amount',
  BlockNumber = 'blockNumber',
  BlockTimestamp = 'blockTimestamp',
  Id = 'id',
  Recipient = 'recipient',
  TransactionHash = 'transactionHash'
}

/** Defines the order direction, either ascending or descending */
export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export type Query = {
  __typename?: 'Query';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  airdropClaim?: Maybe<AirdropClaim>;
  airdropClaims: Array<AirdropClaim>;
  airdropDistributionStat?: Maybe<AirdropDistributionStat>;
  airdropDistributionStats: Array<AirdropDistributionStat>;
  airdropStats: Array<AirdropStats>;
  canClaimEvent?: Maybe<CanClaimEvent>;
  canClaimEvents: Array<CanClaimEvent>;
  cumulativeAirdropClaimStat?: Maybe<CumulativeAirdropClaimStat>;
  cumulativeAirdropClaimStats: Array<CumulativeAirdropClaimStat>;
  dailyTransferStat?: Maybe<DailyTransferStat>;
  dailyTransferStats: Array<DailyTransferStat>;
  delegateVotesBalance?: Maybe<DelegateVotesBalance>;
  delegateVotesBalances: Array<DelegateVotesBalance>;
  delegateVotesChangedEvent?: Maybe<DelegateVotesChangedEvent>;
  delegateVotesChangedEvents: Array<DelegateVotesChangedEvent>;
  hasClaimedEvent?: Maybe<HasClaimedEvent>;
  hasClaimedEvents: Array<HasClaimedEvent>;
  tokenBalance?: Maybe<TokenBalance>;
  tokenBalances: Array<TokenBalance>;
  transferEvent?: Maybe<TransferEvent>;
  transferEvents: Array<TransferEvent>;
};


export type Query_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};


export type QueryAirdropClaimArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryAirdropClaimsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<AirdropClaim_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<AirdropClaim_Filter>;
};


export type QueryAirdropDistributionStatArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryAirdropDistributionStatsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<AirdropDistributionStat_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<AirdropDistributionStat_Filter>;
};


export type QueryAirdropStatsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<AirdropStats_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<AirdropStats_Filter>;
};


export type QueryCanClaimEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryCanClaimEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<CanClaimEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<CanClaimEvent_Filter>;
};


export type QueryCumulativeAirdropClaimStatArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryCumulativeAirdropClaimStatsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<CumulativeAirdropClaimStat_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<CumulativeAirdropClaimStat_Filter>;
};


export type QueryDailyTransferStatArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryDailyTransferStatsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<DailyTransferStat_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<DailyTransferStat_Filter>;
};


export type QueryDelegateVotesBalanceArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryDelegateVotesBalancesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<DelegateVotesBalance_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<DelegateVotesBalance_Filter>;
};


export type QueryDelegateVotesChangedEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryDelegateVotesChangedEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<DelegateVotesChangedEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<DelegateVotesChangedEvent_Filter>;
};


export type QueryHasClaimedEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryHasClaimedEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<HasClaimedEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<HasClaimedEvent_Filter>;
};


export type QueryTokenBalanceArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryTokenBalancesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<TokenBalance_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<TokenBalance_Filter>;
};


export type QueryTransferEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryTransferEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<TransferEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<TransferEvent_Filter>;
};

export type Subscription = {
  __typename?: 'Subscription';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  airdropClaim?: Maybe<AirdropClaim>;
  airdropClaims: Array<AirdropClaim>;
  airdropDistributionStat?: Maybe<AirdropDistributionStat>;
  airdropDistributionStats: Array<AirdropDistributionStat>;
  airdropStats: Array<AirdropStats>;
  canClaimEvent?: Maybe<CanClaimEvent>;
  canClaimEvents: Array<CanClaimEvent>;
  cumulativeAirdropClaimStat?: Maybe<CumulativeAirdropClaimStat>;
  cumulativeAirdropClaimStats: Array<CumulativeAirdropClaimStat>;
  dailyTransferStat?: Maybe<DailyTransferStat>;
  dailyTransferStats: Array<DailyTransferStat>;
  delegateVotesBalance?: Maybe<DelegateVotesBalance>;
  delegateVotesBalances: Array<DelegateVotesBalance>;
  delegateVotesChangedEvent?: Maybe<DelegateVotesChangedEvent>;
  delegateVotesChangedEvents: Array<DelegateVotesChangedEvent>;
  hasClaimedEvent?: Maybe<HasClaimedEvent>;
  hasClaimedEvents: Array<HasClaimedEvent>;
  tokenBalance?: Maybe<TokenBalance>;
  tokenBalances: Array<TokenBalance>;
  transferEvent?: Maybe<TransferEvent>;
  transferEvents: Array<TransferEvent>;
};


export type Subscription_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};


export type SubscriptionAirdropClaimArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionAirdropClaimsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<AirdropClaim_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<AirdropClaim_Filter>;
};


export type SubscriptionAirdropDistributionStatArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionAirdropDistributionStatsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<AirdropDistributionStat_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<AirdropDistributionStat_Filter>;
};


export type SubscriptionAirdropStatsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<AirdropStats_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<AirdropStats_Filter>;
};


export type SubscriptionCanClaimEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionCanClaimEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<CanClaimEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<CanClaimEvent_Filter>;
};


export type SubscriptionCumulativeAirdropClaimStatArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionCumulativeAirdropClaimStatsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<CumulativeAirdropClaimStat_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<CumulativeAirdropClaimStat_Filter>;
};


export type SubscriptionDailyTransferStatArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionDailyTransferStatsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<DailyTransferStat_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<DailyTransferStat_Filter>;
};


export type SubscriptionDelegateVotesBalanceArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionDelegateVotesBalancesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<DelegateVotesBalance_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<DelegateVotesBalance_Filter>;
};


export type SubscriptionDelegateVotesChangedEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionDelegateVotesChangedEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<DelegateVotesChangedEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<DelegateVotesChangedEvent_Filter>;
};


export type SubscriptionHasClaimedEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionHasClaimedEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<HasClaimedEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<HasClaimedEvent_Filter>;
};


export type SubscriptionTokenBalanceArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionTokenBalancesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<TokenBalance_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<TokenBalance_Filter>;
};


export type SubscriptionTransferEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionTransferEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<TransferEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<TransferEvent_Filter>;
};

export type TokenBalance = {
  __typename?: 'TokenBalance';
  address: Scalars['Bytes'];
  balance: Scalars['BigInt'];
  id: Scalars['Bytes'];
};

export type TokenBalance_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  address?: InputMaybe<Scalars['Bytes']>;
  address_contains?: InputMaybe<Scalars['Bytes']>;
  address_gt?: InputMaybe<Scalars['Bytes']>;
  address_gte?: InputMaybe<Scalars['Bytes']>;
  address_in?: InputMaybe<Array<Scalars['Bytes']>>;
  address_lt?: InputMaybe<Scalars['Bytes']>;
  address_lte?: InputMaybe<Scalars['Bytes']>;
  address_not?: InputMaybe<Scalars['Bytes']>;
  address_not_contains?: InputMaybe<Scalars['Bytes']>;
  address_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  and?: InputMaybe<Array<InputMaybe<TokenBalance_Filter>>>;
  balance?: InputMaybe<Scalars['BigInt']>;
  balance_gt?: InputMaybe<Scalars['BigInt']>;
  balance_gte?: InputMaybe<Scalars['BigInt']>;
  balance_in?: InputMaybe<Array<Scalars['BigInt']>>;
  balance_lt?: InputMaybe<Scalars['BigInt']>;
  balance_lte?: InputMaybe<Scalars['BigInt']>;
  balance_not?: InputMaybe<Scalars['BigInt']>;
  balance_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  id?: InputMaybe<Scalars['Bytes']>;
  id_contains?: InputMaybe<Scalars['Bytes']>;
  id_gt?: InputMaybe<Scalars['Bytes']>;
  id_gte?: InputMaybe<Scalars['Bytes']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_lt?: InputMaybe<Scalars['Bytes']>;
  id_lte?: InputMaybe<Scalars['Bytes']>;
  id_not?: InputMaybe<Scalars['Bytes']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  or?: InputMaybe<Array<InputMaybe<TokenBalance_Filter>>>;
};

export enum TokenBalance_OrderBy {
  Address = 'address',
  Balance = 'balance',
  Id = 'id'
}

export type TransferEvent = {
  __typename?: 'TransferEvent';
  blockNumber: Scalars['BigInt'];
  blockTimestamp: Scalars['BigInt'];
  from: Scalars['Bytes'];
  id: Scalars['Bytes'];
  to: Scalars['Bytes'];
  transactionHash: Scalars['Bytes'];
  value: Scalars['BigInt'];
};

export type TransferEvent_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<TransferEvent_Filter>>>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  from?: InputMaybe<Scalars['Bytes']>;
  from_contains?: InputMaybe<Scalars['Bytes']>;
  from_gt?: InputMaybe<Scalars['Bytes']>;
  from_gte?: InputMaybe<Scalars['Bytes']>;
  from_in?: InputMaybe<Array<Scalars['Bytes']>>;
  from_lt?: InputMaybe<Scalars['Bytes']>;
  from_lte?: InputMaybe<Scalars['Bytes']>;
  from_not?: InputMaybe<Scalars['Bytes']>;
  from_not_contains?: InputMaybe<Scalars['Bytes']>;
  from_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id?: InputMaybe<Scalars['Bytes']>;
  id_contains?: InputMaybe<Scalars['Bytes']>;
  id_gt?: InputMaybe<Scalars['Bytes']>;
  id_gte?: InputMaybe<Scalars['Bytes']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_lt?: InputMaybe<Scalars['Bytes']>;
  id_lte?: InputMaybe<Scalars['Bytes']>;
  id_not?: InputMaybe<Scalars['Bytes']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  or?: InputMaybe<Array<InputMaybe<TransferEvent_Filter>>>;
  to?: InputMaybe<Scalars['Bytes']>;
  to_contains?: InputMaybe<Scalars['Bytes']>;
  to_gt?: InputMaybe<Scalars['Bytes']>;
  to_gte?: InputMaybe<Scalars['Bytes']>;
  to_in?: InputMaybe<Array<Scalars['Bytes']>>;
  to_lt?: InputMaybe<Scalars['Bytes']>;
  to_lte?: InputMaybe<Scalars['Bytes']>;
  to_not?: InputMaybe<Scalars['Bytes']>;
  to_not_contains?: InputMaybe<Scalars['Bytes']>;
  to_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  value?: InputMaybe<Scalars['BigInt']>;
  value_gt?: InputMaybe<Scalars['BigInt']>;
  value_gte?: InputMaybe<Scalars['BigInt']>;
  value_in?: InputMaybe<Array<Scalars['BigInt']>>;
  value_lt?: InputMaybe<Scalars['BigInt']>;
  value_lte?: InputMaybe<Scalars['BigInt']>;
  value_not?: InputMaybe<Scalars['BigInt']>;
  value_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};

export enum TransferEvent_OrderBy {
  BlockNumber = 'blockNumber',
  BlockTimestamp = 'blockTimestamp',
  From = 'from',
  Id = 'id',
  To = 'to',
  TransactionHash = 'transactionHash',
  Value = 'value'
}

export type _Block_ = {
  __typename?: '_Block_';
  /** The hash of the block */
  hash?: Maybe<Scalars['Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>;
};

/** The type for the top-level _meta field */
export type _Meta_ = {
  __typename?: '_Meta_';
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: _Block_;
  /** The deployment ID */
  deployment: Scalars['String'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean'];
};

export enum _SubgraphErrorPolicy_ {
  /** Data will be returned even if the subgraph has indexing errors */
  Allow = 'allow',
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  Deny = 'deny'
}

export type GetAirdropDistributionQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAirdropDistributionQuery = { __typename?: 'Query', airdropDistributionStats: Array<{ __typename?: 'AirdropDistributionStat', id: string, amount: any, totalAmount: any, totalRecipients: any }> };

export type GetAirdropStatsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAirdropStatsQuery = { __typename?: 'Query', airdropStats: Array<{ __typename?: 'AirdropStats', id: string, totalAmount: any, totalRecipients: any, totalClaimedAmount: any, totalClaimedRecipients: any }> };

export type GetTokenBalancesQueryVariables = Exact<{
  address?: InputMaybe<Scalars['Bytes']>;
  limit?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
}>;


export type GetTokenBalancesQuery = { __typename?: 'Query', tokenBalances: Array<{ __typename?: 'TokenBalance', address: any, balance: any }> };


export const GetAirdropDistributionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getAirdropDistribution"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"airdropDistributionStats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"totalAmount"}},{"kind":"Field","name":{"kind":"Name","value":"totalRecipients"}}]}}]}}]} as unknown as DocumentNode<GetAirdropDistributionQuery, GetAirdropDistributionQueryVariables>;
export const GetAirdropStatsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getAirdropStats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"airdropStats"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"1"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"totalAmount"}},{"kind":"Field","name":{"kind":"Name","value":"totalRecipients"}},{"kind":"Field","name":{"kind":"Name","value":"totalClaimedAmount"}},{"kind":"Field","name":{"kind":"Name","value":"totalClaimedRecipients"}}]}}]}}]} as unknown as DocumentNode<GetAirdropStatsQuery, GetAirdropStatsQueryVariables>;
export const GetTokenBalancesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getTokenBalances"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"address"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Bytes"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tokenBalances"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"address_contains"},"value":{"kind":"Variable","name":{"kind":"Name","value":"address"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"balance"}},{"kind":"Argument","name":{"kind":"Name","value":"orderDirection"},"value":{"kind":"EnumValue","value":"desc"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"balance"}}]}}]}}]} as unknown as DocumentNode<GetTokenBalancesQuery, GetTokenBalancesQueryVariables>;