"use client";

import { useEffect, useState } from "react";
import { BrowserProvider, Contract } from "ethers";
import CONTRACT_ABI from "../data/contractABI.json";

const CONTRACT_ADDRESS =
  process.env.NEXT_PUBLIC_CONTRACT_ADDRESS ||
  "0x202934e4dF29E57Ab7498bB31946174d7C95eDc7";

export default function WalletMintAdmin() {
  const [address, setAddress] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isMinting, setIsMinting] = useState(false);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  // Prevent SSR issues on Cloudflare
  useEffect(() => {
    setIsClient(true);
  }, []);

  const connectWallet = async () => {
    try {
      if (!isClient || !window.ethereum) {
        setError("MetaMask not detected!");
        return;
      }

      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const userAddr = await signer.getAddress();

      setAddress(userAddr);
      setIsConnected(true);
      setError(null);
    } catch (err: any) {
      setError(err?.message || "Failed to connect wallet");
    }
  };

  const disconnectWallet = () => {
    setIsConnected(false);
    setAddress(null);
    setError(null);
    setTxHash(null);
  };

  const mintNFT = async () => {
    if (!isClient || !window.ethereum) {
      setError("MetaMask not detected!");
      return;
    }

    try {
      setIsMinting(true);
      setError(null);
      setTxHash(null);

      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const contract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

      // change mint() if your contract uses a different function
      const tx = await contract.mint({ value: 0 });
      const receipt = await tx.wait();

      setTxHash(receipt.hash);
      setIsMinting(false);
    } catch (err: any) {
      setError(err?.message || "Mint failed");
      setIsMinting(false);
    }
  };

  if (!isClient) {
    return (
      <div className="p-4 border rounded-md shadow-md w-full max-w-md mx-auto">
        <p>Loading wallet tools…</p>
      </div>
    );
  }

  return (
    <div className="p-4 border rounded-md shadow-md w-full max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Wallet Mint Admin</h2>

      {isConnected ? (
        <div className="space-y-3">
          <p className="text-sm">Connected wallet:</p>
          <p className="font-mono bg-gray-100 p-2 rounded">{address}</p>

          <button
            onClick={disconnectWallet}
            className="w-full px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Disconnect
          </button>

          <button
            onClick={mintNFT}
            disabled={isMinting}
            className={`w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 ${
              isMinting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isMinting ? "Minting…" : "Mint NFT"}
          </button>

          {txHash && (
            <p className="text-green-600 text-sm">
              Mint successful!{" "}
              <a
                href={`https://etherscan.io/tx/${txHash}`}
                target="_blank"
                className="underline text-blue-600"
              >
                View on Etherscan
              </a>
            </p>
          )}
        </div>
      ) : (
        <button
          onClick={connectWallet}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Connect Wallet
        </button>
      )}

      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
  }
