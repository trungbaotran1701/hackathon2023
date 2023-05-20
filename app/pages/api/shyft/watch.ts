import {
  NETWORK_URL,
  WORMHOLE_ETH_ABI,
  WORMHOLE_ETH_SM_ADDRESS,
} from "@/config/config";
import { formater } from "@/ultis/formater";
import { ethers } from "ethers";
import { NextApiRequest, NextApiResponse } from "next";
import Web3 from "web3";
import { AbiItem } from "web3-utils";
interface ShyftCallProps {
  timestamp: string;
  fee: string;
  fee_payer: "5aMGztMuSVPAp4nm6vrkU25BAho6gGxpWHnnaKZfiUHP";
  signers: ["5aMGztMuSVPAp4nm6vrkU25BAho6gGxpWHnnaKZfiUHP"];
  signatures: string[];
  protocol: {
    address: string;
    name: string;
  };
  type: string;
  status: string;
  actions: any[];
  accounts: {
    address: string;
    owner: string;
    lamports: number;
    data: string;
  }[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method !== "POST") {
    return res.status(405).json({
      msg: "Invalid method",
    });
  }
  const body = req.body as ShyftCallProps;
  const normalNumber = formater.formatSequence(
    body.accounts[0].data.toString()
  );
  try {
    const result = await getDataFromWormHole(normalNumber);
    if (result.vaaBytes !== undefined) {
      const hexString = `0x${Buffer.from(result.vaaBytes, "base64").toString(
        "hex"
      )}`;
      console.log("yo", hexString);
      //  const web3 = new Web3(NETWORK_URL);

      // const contract = new web3.eth.Contract(
      //   WORMHOLE_ETH_ABI as AbiItem[],
      //   WORMHOLE_ETH_SM_ADDRESS
      // );
      // await contract.methods.receiveMessage
      const privateKey = process.env.PRIVATE_KEY_SERVER as string;
      const provider = new ethers.JsonRpcProvider(NETWORK_URL);
      const signer = new ethers.Wallet(privateKey, provider);

      const contract = new ethers.Contract(
        WORMHOLE_ETH_SM_ADDRESS,
        WORMHOLE_ETH_ABI,
        signer
      );

      let tx = await contract.receiveMessage(hexString);
      const resultVjp = await tx.wait();

      console.log(resultVjp);
    } else {
      return;
    }
  } catch (error) {
    console.log("err", error);
    return;
  }
}

export interface WormholeResProps {
  vaaBytes: string | undefined;
}
async function getDataFromWormHole(
  sequence: string
): Promise<WormholeResProps> {
  const url = `https://wormhole-v2-testnet-api.certus.one/v1/signed_vaa/1/31edd4c8dde7d88c8634cf36dcc9414d66baed7d23a92cc38ea63cf76c00dcc7/${sequence}`;
  const response = await fetch(url, {
    method: "GET",
  });
  const result = await response.json();
  return result;
}
