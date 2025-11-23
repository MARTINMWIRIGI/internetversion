"use client";

import React, { useState } from "react";
import { Web3Provider } from "ethers";
import CONTRACT_ABI from "../data/contractABI.json";

const CONTRACT_ADDRESS =
  process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || "0x202934e4dF29E57Ab7498bB31946174d7C95eDc7";

export const WalletMintAdmin: React.FC = () => {
  const [address, setAddress] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  const connectWallet = async () => {
    try {
      if (!(window as any).ethereum) {
        setError("MetaMask not detected!");
        return;
      }

      const provider = new Web3Provider((window as any).ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const addr = await signer.getAddress();
      setAddress(addr);
      setIsConnected(true);
      setError(null);
    } catch (err: any) {
      setError(err.message || "Failed to connect wallet");
      setIsConnected(false);
      setAddress(null);
    }
  };

  const disconnectWallet = () => {
    setIsConnected(false);
    setAddress(null);
    setError(null);
  };

  return (
    <div className="p-4 border rounded-md shadow-md w-full max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Wallet Mint Admin</h2>
      {isConnected ? (
        <div>
          <p className="mb-2">Connected wallet: {address}</p>
          <button
            onClick={disconnectWallet}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Disconnect
          </button>
        </div>
      ) : (
        <div>
          <button
            onClick={connectWallet}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Connect Wallet
          </button>
        </div>
      )}
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};