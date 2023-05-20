import { formater } from "@/ultis/formater";
import { NextApiRequest, NextApiResponse } from "next";

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
      const hexString = Buffer.from(result.vaaBytes, "base64").toString("hex");
      console.log("yo", hexString);
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
