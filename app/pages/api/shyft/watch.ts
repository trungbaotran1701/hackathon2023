import {
  IDL,
  NETWORK_URL,
  WORMHOLE_ETH_ABI,
  WORMHOLE_ETH_SM_ADDRESS,
} from "@/config/config";
import { ethers } from "ethers";
import { NextApiRequest, NextApiResponse } from "next";
import * as anchor from "@project-serum/anchor";
import { createHellowormProgramInterface } from "@/needed";

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
  Log({ start: "hieu" });

  try {
    const connection = new anchor.web3.Connection(
      anchor.web3.clusterApiUrl("devnet")
    );

    const programId = new anchor.web3.PublicKey(
      "GsTfE4Ndievuh8G5EWAPcS7aixwKyN5YdZNymq2cVfNV"
    );

    const program = createHellowormProgramInterface(connection, programId);

    const sequence = new anchor.web3.PublicKey(
      "6k4HrdhZdULGRrztGi4fGs5HrJkVjJ5FS5pz76muMLX6"
    );

    program.provider.connection.getAccountInfo(sequence).then(
      async (y) => {
        if (y !== null) {
          const numberSq = JSON.parse(JSON.stringify(y?.data)) as sqData;
          Log({ co: "log1 - numberSq" });
          Log({ numberSq });

          getDataFromWormHole((numberSq.data[0] - 1).toString()).then(
            async (result) => {
              console.log(result);
              if (result.vaaBytes !== undefined && result !== undefined) {
                const hexString = `0x${Buffer.from(
                  result.vaaBytes,
                  "base64"
                ).toString("hex")}`;
                // console.log(hexString);
                Log({ co: "log2-hexString" });
                Log({ hexString });

                const privateKey = process.env.PRIVATE_KEY_WALLET as string;
                const provider = new ethers.providers.JsonRpcProvider(
                  NETWORK_URL
                );
                const signer = new ethers.Wallet(privateKey, provider);
                const contract = new ethers.Contract(
                  WORMHOLE_ETH_SM_ADDRESS,
                  WORMHOLE_ETH_ABI,
                  signer
                );

                contract.receiveMessage(hexString).then(
                  (tx: any) => {
                    tx.wait().then(async (txResult: any) => {
                      Log({ co: "log3 - txResult" });
                      Log({ txResult });
                    });
                  },
                  (reject: any) => {
                    Log({ rejectLog3: reject });
                  }
                );
              } else {
                console.log("con cai nit");
              }
            },
            (reject) => {
              Log({ rejectLog2: reject });
            }
          );
        }
      },

      (reject) => {
        Log({ rejectLog1: reject });
      }
    );
    // console.log(y);
    // console.log(JSON.stringify(y?.data));

    // console.log();

    // console.log(BigInt(`0x${y?.data}`).toString());
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
  const url = `https://wormhole-v2-testnet-api.certus.one/v1/signed_vaa/1/48f36f42900d19f2c974355483d9fb397907481c344904bc2c56bd659890d867/${sequence}`;
  const response = await fetch(url, {
    method: "GET",
  });
  const result = await response.json();
  return result;
}

async function Log(obj: any) {
  const response = await fetch(
    "https://uafmqopjujmosmilsefw.functions.supabase.co/hello",
    {
      method: "POST",
      body: JSON.stringify(obj),
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVhZm1xb3BqdWptb3NtaWxzZWZ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODMxODg2NzYsImV4cCI6MTk5ODc2NDY3Nn0.Bf4NzdTS-t2inGzSZguBAfZmnEBHTQj6Lx6KOfBzeSc",
      },
    }
  );
  const result = await response.json();
  console.log(result);
}
