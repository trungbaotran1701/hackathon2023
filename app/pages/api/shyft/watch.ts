import {
  IDL,
  NETWORK_URL,
  WORMHOLE_ETH_ABI,
  WORMHOLE_ETH_SM_ADDRESS,
} from "@/config/config";
import { ethers } from "ethers";
import { NextApiRequest, NextApiResponse } from "next";
import * as anchor from "@project-serum/anchor";
// import { Idl } from "@coral-xyz/anchor";

interface sqData {
  data: number[];
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

  try {
    const connection = new anchor.web3.Connection(
      anchor.web3.clusterApiUrl("devnet")
    );
    const keypair = anchor.web3.Keypair.fromSecretKey(
      Uint8Array.from([
        117, 236, 123, 231, 3, 86, 76, 118, 219, 53, 209, 116, 100, 107, 104,
        45, 24, 212, 212, 172, 41, 90, 158, 45, 162, 77, 170, 77, 197, 203, 199,
        97, 181, 137, 59, 14, 79, 91, 180, 227, 19, 63, 251, 94, 221, 222, 160,
        247, 12, 133, 166, 5, 200, 154, 17, 14, 218, 164, 2, 86, 251, 33, 220,
        237,
      ])
    );

    const wallet = new anchor.Wallet(keypair);
    const provider1 = new anchor.AnchorProvider(connection, wallet, {});
    anchor.setProvider(provider1);

    const programId = new anchor.web3.PublicKey(
      "DWsqktwic4mJ5JbnsoBcBB646NWiBgjYuKJsTHXDRzPS"
    );

    const program = new anchor.Program(IDL as anchor.Idl, programId);

    const sequence = new anchor.web3.PublicKey(
      "FSXG7Gvbf8iNYUjhUynbEqykPqRbGxhSR1tRyzxzjjFp"
    );

    const y = await program.provider.connection.getAccountInfo(sequence);
    // console.log(y);
    // console.log(JSON.stringify(y?.data));
    const numberSq = JSON.parse(JSON.stringify(y?.data)) as sqData;
    // console.log();

    // console.log(BigInt(`0x${y?.data}`).toString());

    const result = await getDataFromWormHole(numberSq.data[0].toString());
    if (result.vaaBytes !== undefined) {
      const hexString = `0x${Buffer.from(result.vaaBytes, "base64").toString(
        "hex"
      )}`;
      const privateKey = process.env.PRIVATE_KEY_WALLET as string;
      const provider = new ethers.JsonRpcProvider(NETWORK_URL);
      const signer = new ethers.Wallet(privateKey, provider);
      const contract = new ethers.Contract(
        WORMHOLE_ETH_SM_ADDRESS,
        WORMHOLE_ETH_ABI,
        signer
      );

      let tx = await contract.receiveMessage(hexString);
      await tx.wait();
    } else {
      console.log("con cai nit");
    }
  } catch (error) {
    console.log("exc", error);
  }
  return res.status(200).send("Finished");
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
