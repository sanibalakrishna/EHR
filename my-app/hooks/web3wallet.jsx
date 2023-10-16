"use client";
import React, { createContext, useState, useRef, useEffect } from "react";
import Web3Modal, { local } from "web3modal";
import { ethers } from "ethers";
import { Single_Day } from "next/font/google";
export const Web3walletContext = createContext();
function Web3walletProvider({ children }) {
  const [type, setType] = useState("");
  const [address, setAddress] = useState("");
  const [walletConnected, setWalletConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const web3ModalRef = useRef();

  const connectWallet = async () => {
    try {
      await getProviderOrSigner(true);
      setWalletConnected(true);
    } catch (err) {
      console.log(err);
    }
  };

  const getProviderOrSigner = async (needSigner = false) => {
    const provider = await web3ModalRef.current.connect();
    const ethersProvider = new ethers.BrowserProvider(provider);
    const { chainId } = await ethersProvider.getNetwork();
    const signer = await ethersProvider.getSigner();
    setAddress(signer.address);

    if (needSigner) {
      const signer = await ethersProvider.getSigner();
      return signer;
    }
    return ethersProvider;
  };

  const values = {
    address,
    walletConnected,
    loading,
    type,
    connectWallet,
    getProviderOrSigner,
    setLoading,
    setType,
    setAddress,
    setWalletConnected,
  };
  useEffect(() => {
    web3ModalRef.current = new Web3Modal({
      network: "sepolia",
      providerOptions: {},
      disableInjectedProvider: false,
    });
  }, []);
  return (
    <Web3walletContext.Provider value={values}>
      {children}
    </Web3walletContext.Provider>
  );
}

export default Web3walletProvider;
