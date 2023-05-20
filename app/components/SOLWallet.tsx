import {
  ConnectionProvider,
  WalletProvider,
  useConnection,
  useWallet,
} from "@solana/wallet-adapter-react";
import {
  GlowWalletAdapter,
  MathWalletAdapter,
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";
import { Button, Col, Image, Row, Space, Typography } from "antd";
import { ReactNode, useCallback, useEffect, useMemo, useState } from "react";
const { Text } = Typography;

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
      <WalletProvider wallets={wallets} autoConnect>
        <SOLWallets />
      </WalletProvider>
    </ConnectionProvider>
  );
};

const SOLWallets = () => {
  const { select, wallets, publicKey, disconnect, wallet } = useWallet();

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
    getBalance();
  }, [getBalance]);
  // const balance = useMemo(() => getBalance(), [getBalance, publicKey]);
  console.log(balance);

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
    <Space direction="horizontal">
      Connected to:
      <Text keyboard copyable style={{ background: "white" }}>
        {" "}
        {publicKey.toBase58()}
      </Text>
      <Button type="primary" danger onClick={disconnect}>
        Disconnect
      </Button>
    </Space>
  );
};

export default SOLWalletsProvider;
