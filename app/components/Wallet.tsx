import {
  Button,
  Col,
  Form,
  InputNumber,
  Modal,
  Popconfirm,
  Row,
  Space,
  Typography,
  message,
} from "antd";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
// import { ETH_ABI, ETH_CONTRACT_ADDRESS, NETWORK_URL } from "@/config/config";
import { createTransaction } from "@/service/app.api";
const { Text, Title } = Typography;

interface FormValuesProps {
  luckyNumber: number;
}

const Wallets = () => {
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
  const [openModal, setOpenModal] = useState(false);

  async function connectWallet() {
    if (window.ethereum) {
      if (window.ethereum.request) {
        try {
          const addressArray = await window.ethereum.request({
            method: "eth_requestAccounts",
          });

          if (addressArray.length > 0) {
            setSelectedAddress(addressArray[0]);
          } else {
            return null;
          }
        } catch (err) {
          console.error(err);
          return null;
        }
      } else {
        alert("Please make sure you have MetaMask installed and enabled.");
        return null;
      }
    } else {
      alert("Please install MetaMask!");
      return null;
    }
  }

  function disconnectWallet() {
    setSelectedAddress(null);
  }

  // async function getBalance() {
  //   if (selectedAddress) {
  //     const provider = new ethers.JsonRpcProvider(
  //       "https://data-seed-prebsc-1-s1.binance.org:8545/"
  //     );
  //     console.log(provider);
  //     const balance = await provider.getBalance(selectedAddress);
  //     // setBalance(ethers.utils.formatEther(balance));
  //   }
  // }

  useEffect(() => {
    if (
      !selectedAddress &&
      window.ethereum &&
      window.ethereum.selectedAddress
    ) {
      setSelectedAddress(window.ethereum.selectedAddress);
      // getBalance();
    }
  }, [selectedAddress]);

  async function onConfirm(values: FormValuesProps) {
    console.log(values);

    const luckyNumber = values.luckyNumber.toString();
    console.log(luckyNumber, selectedAddress);

    const numberMsg = `${luckyNumber}`;

    try {
      if (
        window !== undefined &&
        window.ethereum !== undefined &&
        window.ethereum.request !== undefined
      ) {
        const from = selectedAddress;
        const msg = `0x${Buffer.from(numberMsg, "utf8").toString("hex")}`;
        const sign = await window.ethereum.request({
          method: "personal_sign",
          params: [msg, from, "Example password"],
        });
        const verify = ethers.verifyMessage(numberMsg, sign);

        if (verify?.toLocaleLowerCase() === selectedAddress) {
          const result = await createTransaction(
            numberMsg,
            selectedAddress,
            sign
          );
          console.log(result);

          message.success("Sucess");
        } else {
          console.log("false");
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="App">
      {selectedAddress !== null ? (
        <Space direction="vertical">
          <Title level={5} style={{ color: "white" }}>
            {" "}
            Connected with:{" "}
          </Title>
          <Text
            code
            copyable
            style={{
              fontSize: "1.3rem",
              background: "white",
              padding: 8,
              borderRadius: 8,
            }}
          >
            {selectedAddress}
          </Text>
          <Popconfirm
            title="Are you sure?"
            okText="Disconnect"
            onConfirm={() => disconnectWallet()}
          >
            <Button danger type="primary">
              Disconnect
            </Button>
          </Popconfirm>
          <Button
            disabled={selectedAddress === null ? true : false}
            size="large"
            onClick={() => setOpenModal(true)}
          >
            Play
          </Button>

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
              initialValues={{ amount: 1 }}
              onFinish={onConfirm}
              // onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label="Enter your lucky number (from 1-10)"
                name="luckyNumber"
                rules={[
                  { required: true, message: "Please fill your number!" },
                ]}
              >
                <InputNumber
                  min={1}
                  max={10}
                  placeholder="Enter your lucky number (from 1-10)"
                />
              </Form.Item>

              <Form.Item>
                <Button
                  disabled={selectedAddress === null ? true : false}
                  type="primary"
                  block
                  htmlType="submit"
                >
                  Send
                </Button>
              </Form.Item>
            </Form>
          </Modal>
        </Space>
      ) : (
        <Row>
          <Col>
            Please connect to your wallet:{" "}
            <Button type="primary" onClick={connectWallet}>
              Connect Wallet
            </Button>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default Wallets;
