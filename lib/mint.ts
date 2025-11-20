"use client";

import { NFTStorage, File } from "nft.storage";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";

const nftStorageClient = new NFTStorage({ token: process.env.NEXT_PUBLIC_NFT_STORAGE_KEY! });

export async function mintContributionNFT(data: any) {
  if (!data.audioBlob || !data.walletAddress) throw new Error("Audio or wallet missing");

  // 1️⃣ Upload audio + generate metadata
  const audioFile = new File([data.audioBlob], `${data.words}.webm`, { type: "audio/webm" });

  const metadata = await nftStorageClient.store({
    name: data.words,
    description: `${data.words} (${data.contentType}) in ${data.language}\nDefinition: ${data.definition}\nPronunciation: ${data.pronunciation}\nContext: ${data.context}`,
    animation_url: audioFile,
    image: "optional-placeholder.png", // Could be waveform screenshot
    attributes: [
      { trait_type: "Language", value: data.language },
      { trait_type: "Content Type", value: data.contentType },
    ],
  });

  // 2️⃣ Mint NFT via Thirdweb
  const sdk = new ThirdwebSDK("polygon"); // Polygon mainnet
  const contract = await sdk.getContract(process.env.NEXT_PUBLIC_THIRDWEB_NFT_CONTRACT!);
  const tx = await contract.mintTo(data.walletAddress, metadata.url);

  return { tx, metadataUrl: metadata.url };
}