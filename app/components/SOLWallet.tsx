import { WalletAddContext } from "@/context/WalletContext";
import { IDL } from "@/config/config";
import {
  ConnectionProvider,
  WalletProvider,
  useConnection,
  useWallet,
} from "@solana/wallet-adapter-react";
import { CORE_BRIDGE_PID } from "@/helper";
import { createSendMessageInstruction } from "@/needed";
import { Helloworm } from "@/helloworm";
import {
  GlowWalletAdapter,
  MathWalletAdapter,
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { Transaction, clusterApiUrl } from "@solana/web3.js";
import {
  Button,
  Col,
  Divider,
  Image,
  Row,
  Space,
  Typography,
  message,
} from "antd";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
const { Text } = Typography;
import * as anchor from "@project-serum/anchor";
import { ethers } from "ethers";
import { sign } from "crypto";
import { createHellowormProgramInterface } from "@/needed";
const SOLWalletsProvider = () => {
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
      new GlowWalletAdapter(),
      new MathWalletAdapter(),
    ],
    []
  );
  const endpoint = useMemo(() => clusterApiUrl("devnet"), []);
  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect={true}>
        <SOLWallets />
      </WalletProvider>
    </ConnectionProvider>
  );
};

type MessageTransfer = {
  from: ethers.Wallet["publicKey"];
  to: ethers.Wallet["publicKey"];
  tokenAddess: ethers.Wallet["publicKey"];
  amount: number;
};

const SOLWallets = () => {
  const { select, wallets, publicKey, disconnect, signTransaction } =
    useWallet();
  const { metamaskAdd, phantomAdd, setPhantomAdd } =
    useContext(WalletAddContext);

  const { connection } = useConnection();
  const [balance, setBalance] = useState<any>();
  const getBalance = useCallback(async () => {
    let result = null;
    if (publicKey !== null) {
      result = await connection.getBalance(publicKey);
    }
    setBalance(result);
  }, [publicKey]);

  useEffect(() => {
    if (publicKey !== null) {
      getBalance();
      setPhantomAdd(publicKey.toBase58());
    }
  }, [getBalance, publicKey]);
  // const balance = useMemo(() => getBalance(), [getBalance, publicKey]);
  // console.log(balance);

  async function onSend() {
    message.loading("Please wait and dont do anything....");
    if (publicKey !== null) {
      const connection = new anchor.web3.Connection(
        anchor.web3.clusterApiUrl("devnet")
      );

      const programId = new anchor.web3.PublicKey(
        "GsTfE4Ndievuh8G5EWAPcS7aixwKyN5YdZNymq2cVfNV"
      );

      const program = createHellowormProgramInterface(connection, programId);

      const messageTransfer: MessageTransfer = {
        from: metamaskAdd ?? "",
        to: "0x86f93CdC9cD700C018AC0235D6eB249B38609A0f",
        tokenAddess: "0xec171F51676B62127a4BdfB145944cf8e6fDe08c",
        amount: 10000000000000000000,
      };

      const jsonString = JSON.stringify(messageTransfer);
      let helloMessage = Buffer.from(jsonString, "utf8");
      helloMessage = Buffer.concat([
        Buffer.from(new Uint8Array([2])),
        helloMessage,
      ]);

      const tx = new Transaction();

      tx.add(
        await createSendMessageInstruction(
          connection,
          program.programId,
          publicKey,
          CORE_BRIDGE_PID,
          helloMessage
        )
      );

      tx.feePayer = publicKey ?? undefined;
      tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
      if (signTransaction !== undefined) {
        const signedTx = await signTransaction(tx);
        const txId = await connection.sendRawTransaction(signedTx.serialize());
        const a = await connection.confirmTransaction(txId);
        message.success("Success");
      }
    }
  }

  return !publicKey ? (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Text style={{ color: "white" }}> Connect to SOLANA with:</Text>
      </Col>
      {wallets.filter((wallet) => wallet.readyState === "Installed").length >
      0 ? (
        wallets
          .filter((wallet) => wallet.readyState === "Installed")
          .map((wallet) => (
            <Button
              // disabled={metamaskAdd === null ? true : false}
              key={wallet.adapter.name}
              onClick={() => select(wallet.adapter.name)}
              icon={
                <Image
                  src={wallet.adapter.icon}
                  alt={wallet.adapter.name}
                  width={16}
                  height={16}
                />
              }
            >
              {wallet.adapter.name}
            </Button>
          ))
      ) : (
        <Text>No wallet found. Please download a supported Solana wallet</Text>
      )}
    </Row>
  ) : (
    <>
      <Space direction="horizontal">
        <Text style={{ color: "white" }}>Connected to:</Text>
        <Text
          keyboard
          copyable
          style={{ background: "white", padding: 8, borderRadius: 8 }}
        >
          {publicKey.toBase58()}
        </Text>
        <Button
          type="primary"
          danger
          onClick={() => {
            disconnect();
            setPhantomAdd(null);
          }}
        >
          Disconnect
        </Button>
        <Button
          disabled={phantomAdd === null || metamaskAdd === null}
          type="primary"
          onClick={() => onSend()}
        >
          Send
        </Button>
      </Space>
    </>
  );
};

export default SOLWalletsProvider;
