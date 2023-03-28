import { ARBITRUM_TOKEN_DECIMALS } from "~/constants";

export function formatTokenAmount(amount: string) {
  return (
    BigInt(amount) / BigInt(10 ** ARBITRUM_TOKEN_DECIMALS)
  ).toLocaleString("en-US");
}

export function formatNumber(num: number) {
  return num.toLocaleString("en-US");
}

export function convertTokenAmount(amount: string) {
  return Number(BigInt(amount) / BigInt(10 ** ARBITRUM_TOKEN_DECIMALS));
}
