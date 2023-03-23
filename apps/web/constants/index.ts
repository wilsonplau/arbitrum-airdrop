import { ethers } from "ethers";
import { keccak256 } from "ethereum-cryptography/keccak";
import { toHex, utf8ToBytes } from "ethereum-cryptography/utils";

export const ARBITRUM_TOKEN_ADDRESS =
  "0x912CE59144191C1204E64559FE8253a0e49E6548";
export const ARBITRUM_USER_AIRDROP_ADDRESS =
  "0x67a24ce4321ab3af51c2d0a4801c3e111d88c9d9";
export const ARBITRUM_TOKEN_DECIMALS = 18;

export const ARBITRUM_TOKEN_SUPPLY = 10_000_000_000;
export const TOKEN_DISTRIBUTION_LINK =
  "https://docs.arbitrum.foundation/airdrop-eligibility-distribution";
export const TOKEN_DISTRIBUTION = [
  { name: "Arbitrum DAO Treasury", amount: 4_278_000_000 },
  { name: "Offchain Labs Team", amount: 2_694_000_000 },
  { name: "Offchain Labs Investors", amount: 1_753_000_000 },
  { name: "User Airdrop", amount: 1_162_000_000 },
  { name: "DAO Airdrop", amount: 113_000_000 },
];

export const CAN_CLAIM_EVENT_HASH = toHex(
  keccak256(utf8ToBytes("CanClaim(address,uint256)"))
);
export const CAN_CLAIM_EVENT_INTERFACE = ethers.Interface.from([
  "event CanClaim(address indexed recipient, uint256 amount)",
]);

export const HAS_CLAIMED_EVENT_HASH = toHex(
  keccak256(utf8ToBytes("HasClaimed(address,uint256)"))
);
export const HAS_CLAIMED_EVENT_INTERFACE = ethers.Interface.from([
  "event HasClaimed(address indexed recipient, uint256 amount)",
]);

export const TRANSFER_EVENT_HASH = toHex(
  keccak256(utf8ToBytes("Transfer(address,address,uint256)"))
);
export const TRANSFER_EVENT_INTERFACE = ethers.Interface.from([
  "event Transfer(address indexed from, address indexed to, uint256 value)",
]);
