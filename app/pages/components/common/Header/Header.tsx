import React, { useEffect, useRef } from "react";
import { ethers } from "ethers";
import Button from "../Button/Button";
import { CHAIN_ID, useWeb3Store } from "../../../../store/web3Store";

type Props = {};

declare global {
  interface Window {
    ethereum: any;
  }
}

function Header({}: Props) {
  const { connect, isConnected, walletAddress, disconnect } = useWeb3Store();

  const chainId = useRef(
    typeof window != "undefined" ? window.ethereum.chainId : null
  );

  return (
    <div>
      <Button onClick={() => connect()}>
        <span>{isConnected ? walletAddress : "Connect"}</span>
      </Button>

      {isConnected && (
        <Button onClick={() => disconnect()}>
          <span>Disconnect</span>
        </Button>
      )}

      {chainId.current && chainId.current !== CHAIN_ID && (
        <div>
          <span>Wrong network</span>
        </div>
      )}
    </div>
  );
}

export default Header;
