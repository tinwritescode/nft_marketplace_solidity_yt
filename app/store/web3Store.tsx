import { ethers } from "ethers";
import React, { useEffect } from "react";
import create from "zustand";
import {
  MonoNFT,
  MonoNFT__factory,
  NFTMarketplace,
  NFTMarketplace__factory,
} from "../typechain";
const addresses = require("../contracts/contract-address.json");

export const CHAIN_ID = "0x539";

interface Web3ModelStore {
  isConnected: boolean;
  nftContract: MonoNFT | null;
  marketplaceContract: NFTMarketplace | null;
  walletAddress: string | null;
  isInit: boolean;
  setIsConnected: (isConnected: boolean) => void;
  connect: () => void;
  disconnect: () => void;
  init: () => void;
}

export const useWeb3Store = create<Web3ModelStore>((set, get) => ({
  isConnected: false,
  nftContract: null,
  marketplaceContract: null,
  isInit: false,
  walletAddress: null,
  setIsConnected: (isConnected) => set({ isConnected }),
  connect: async () => {
    // TODO: handle if user hasn't installed metamask
    // check if window.ethereum exists
    if (!window.ethereum) {
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);

    await provider.send("eth_requestAccounts", []);

    const signer = provider.getSigner();

    set({
      isConnected: true,
      walletAddress: await signer.getAddress(),
    });
  },
  disconnect: () => {
    return set({ isConnected: false });
  },
  init: async () => {
    // TODO: handle if user hasn't installed metamask
    // check if window.ethereum exists
    if (!window?.ethereum) {
      console.log("return because of no window.ethereum");
      return;
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const { provider: ethereum } = provider;

    //@ts-ignore
    ethereum.on("accountsChanged", async (accounts: string[]) => {
      if (accounts?.length > 0) {
        set({
          isConnected: true,
          walletAddress: accounts[0],
        });
      } else {
        set({
          isConnected: false,
          walletAddress: null,
        });
      }
    });

    const accounts = await provider.listAccounts();

    if (accounts?.length > 0) {
      set({
        isConnected: true,
        walletAddress: accounts[0],
      });
    }

    //@ts-ignore
    ethereum.on("chainChanged", (_chainId) => window.location.reload());

    set({
      nftContract: MonoNFT__factory.connect(addresses.nftAddress, provider),
      marketplaceContract: NFTMarketplace__factory.connect(
        addresses.marketplaceAddress,
        provider
      ),
      isInit: true,
    });
  },
}));

export const Web3Provider = ({ children }: { children: React.ReactNode }) => {
  const { init, isInit } = useWeb3Store();

  useEffect(() => {
    if (!window.ethereum || isInit) {
      return;
    }

    init();
  }, [ethers]);

  return <>{children}</>;
};
