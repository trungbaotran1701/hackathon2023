import "@/styles/globals.css";
import type { AppProps } from "next/app";

import { useEffect, useMemo } from "react";

import { clusterApiUrl } from "@solana/web3.js";
import { Col, Row } from "antd";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Row justify="center">
      <Col xxl={10}>
        <Component {...pageProps} />
      </Col>
    </Row>
  );
}
