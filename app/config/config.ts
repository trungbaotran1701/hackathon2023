export const APIKEY = process.env.APIKEY as string;

export const NETWORK_URL = "https://data-seed-prebsc-1-s1.binance.org:8545/";

export const ETH_CONTRACT_ADDRESS =
  "0xE99c5011975F86DaC57a5e5a759B07692C7a9DE2";

export const ETH_ABI = [
  {
    inputs: [
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
];
