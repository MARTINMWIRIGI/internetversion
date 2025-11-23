"use client";

import React, { useState } from "react";
import { BrowserProvider, Contract } from "ethers";
import CONTRACT_ABI from "../data/contractABI.json";

const CONTRACT_ADDRESS =
  process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || "0x202934e4dF29E57Ab7498bB31946174d7C95eDc7";

const WalletMintAdmin: React.FC = () => {
  const [address, setAddress] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isMinting, setIsMinting] = useState(false);
  const [txHash, setTxHash] = useState<string | null>(null);

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        setError("MetaMask not detected!");
        return;
      }

      const provider = new BrowserProvider(window.ethereum as any);
      const signer = await provider.getSigner();
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
    setTxHash(null);
  };

  const mintNFT = async () => {
    if (!window.ethereum) {
      setError("MetaMask not detected!");
      return;
    }

    try {
      setIsMinting(true);
      setError(null);
      setTxHash(null);

      const provider = new BrowserProvider(window.ethereum as any);
      const signer = await provider.getSigner();
      const contract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

      // Call your contract's mint function (replace 'mint' with your actual function name)
      const tx = await contract.mint({ value: 0 }); // If your mint costs ETH, replace 0 with amount
      const receipt = await tx.wait();

      setTxHash(receipt.transactionHash);
      setIsMinting(false);
    } catch (err: any) {
      setError(err.message || "Mint failed");
      setIsMinting(false);
    }
  };

  return (
    <div className="p-4 border rounded-md shadow-md w-full max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Wallet Mint Admin</h2>

      {isConnected ? (
        <div className="space-y-2">
          <p>Connected wallet: {address}</p>
          <button
            onClick={disconnectWallet}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Disconnect
          </button>

          <button
            onClick={mintNFT}
            className={`px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 ${
              isMinting ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isMinting}
          >
            {isMinting ? "Minting..." : "Mint NFT"}
          </button>

          {txHash && (
            <p className="text-green-600">
              Mint successful!{" "}
              <a
                href={`https://etherscan.io/tx/${txHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                View on Etherscan
              </a>
            </p>
          )}
        </div>
      ) : (
        <button
          onClick={connectWallet}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Connect Wallet
        </button>
      )}

      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default WalletMintAdmin;