import { APIKEY } from "@/config/config";
import { ResponseProps } from "./api.types";

export interface getTokenProps {
  address: string;
  balance: number;
  info: {
    name: string;
    symbol: string;
    image: string;
  };
}
async function getAllToken(
  walletAdd: string
): Promise<ResponseProps<getTokenProps[]>> {
  const url = `https://api.shyft.to/sol/v1/wallet/all_tokens?network=devnet&wallet=${walletAdd}`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": APIKEY,
    },
  });
  const result = await response.json();
  return result;
}

export const WalletApi = {
  getAllToken,
};
