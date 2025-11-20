// app/api/submissions/route.ts
import { NextRequest, NextResponse } from "next/server";
import { NFTStorage, File } from "nft.storage";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";

const NFT_STORAGE_KEY = process.env.NEXT_PUBLIC_NFT_STORAGE_KEY!;
const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!;

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const {
      language,
      contentType,
      words,
      definition,
      context,
      pronunciation,
      audioUrl,
      videoUrl,
      walletAddress,
    } = data;

    if (!walletAddress || !audioUrl) {
      return NextResponse.json(
        { status: "error", message: "Wallet address and audio required" },
        { status: 400 }
      );
    }

    // 1️⃣ Upload audio + metadata to NFT.Storage
    const nftStorage = new NFTStorage({ token: NFT_STORAGE_KEY });
    const audioBlob = await fetch(audioUrl).then(res => res.blob());

    const metadata = await nftStorage.store({
      name: words,
      description: `Language contribution in ${language}`,
      image: new File([audioBlob], "audio.webm", { type: "audio/webm" }),
      properties: {
        language,
        contentType,
        pronunciation,
        definition,
        context,
        videoUrl: videoUrl || null,
        walletAddress,
      },
    });

    // 2️⃣ Mint NFT on Polygon via Thirdweb
    const sdk = new ThirdwebSDK("polygon");
    const contract = await sdk.getContract(CONTRACT_ADDRESS);

    const tx = await contract.erc721.mintTo(walletAddress, {
      name: words,
      description: `Language contribution in ${language}`,
      image: metadata.url, // IPFS URL
    });

    // 3️⃣ Return NFT info to client
    return NextResponse.json({
      nftMetadataUrl: metadata.url,
      txHash: tx.receipt.transactionHash,
      status: "success",
    });
  } catch (error: any) {
    console.error("Submission / Minting error:", error);
    return NextResponse.json(
      { status: "error", message: error.message },
      { status: 500 }
    );
  }
}