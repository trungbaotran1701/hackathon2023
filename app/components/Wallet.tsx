import { WalletApi } from "@/service/api.wallet";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";

import {
  Button,
  Col,
  Form,
  Image,
  Input,
  InputNumber,
  Modal,
  Popconfirm,
  Row,
  Space,
  Typography,
} from "antd";
import { useCallback, useEffect, useState } from "react";
const { Text } = Typography;

const Wallets = () => {
  const { select, wallets, publicKey, disconnect } = useWallet();
  const { connection } = useConnection();
  const [balance, setBalance] = useState<any>(0);
  const getBalance = useCallback(async () => {
    let result: any = null;

    if (publicKey !== null) {
      result = await connection.getBalance(publicKey, "confirmed");
      const a = await WalletApi.getAllToken(publicKey.toBase58());
      console.log(a);
    }

    setBalance(result);
  }, [publicKey]);

  useEffect(() => {
    getBalance();
  }, [getBalance]);

  const [openModal, setOpenModal] = useState(false);

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
    <Row>
      <Col span={24}>
        <Space>
          <Text
            keyboard
            copyable
            style={{
              background: "white",
              fontSize: "1.2rem",
              padding: 8,
              borderRadius: 6,
            }}
          >
            {publicKey.toBase58()}
          </Text>
          <Popconfirm
            title="Are you sure?"
            onConfirm={disconnect}
            okText="Disconnect"
          >
            <Button type="primary" danger size="large">
              Disconnect
            </Button>
          </Popconfirm>
        </Space>
      </Col>

      <Col span={24}>
        <Text>Balance</Text>
        <Row gutter={[16, 16]}>
          <Col span={24}>{`${
            typeof balance === "number" && balance / 1000000000
          } $SOL`}</Col>
          <Col span={24}>
            <Button type="primary" onClick={() => setOpenModal(true)}>
              Send
            </Button>
          </Col>
        </Row>
      </Col>
      <Modal
        title="Send"
        footer={null}
        onCancel={() => setOpenModal(false)}
        open={openModal}
      >
        <Form
          name="send"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          initialValues={{ amount: 0 }}
          // onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Send to (receiver wallet address)"
            name="to"
            rules={[
              {
                required: true,
                message: "Please inputreceiver wallet address!",
              },
            ]}
          >
            <Input style={{ width: 480 }} placeholder="Receiver address" />
          </Form.Item>

          <Form.Item
            label="Amounmt"
            name="amount"
            rules={[{ required: true, message: "Please input amount!" }]}
          >
            <InputNumber
              style={{ width: 480 }}
              min={0}
              max={balance ?? 0}
              placeholder="Amount"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" block htmlType="submit">
              Send
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Row>
  );
};

export default Wallets;
