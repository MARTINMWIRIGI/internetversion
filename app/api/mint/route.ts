import { NextResponse } from "next/server";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { NFTStorage } from "nft.storage";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  try {
    const { submissionId } = await req.json();

    // 1. Connect Supabase
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE!
    );

    // 2. Fetch submission data
    const { data: submission, error } = await supabase
      .from("wizard_submissions")
      .select("*")
      .eq("id", submissionId)
      .single();

    if (error || !submission) {
      return NextResponse.json({ error: "Submission not found" }, { status: 404 });
    }

    const { user_text, wallet_address } = submission;

    // 3. Upload text to NFT.Storage
    const nftStorage = new NFTStorage({ token: process.env.NFT_STORAGE_KEY! });

    const metadata = await nftStorage.store({
      name: "Soul Internet Contribution",
      description: user_text,
      image: new Blob([user_text], { type: "text/plain" }), // display text on OpenSea
    });

    // 4. Mint via Thirdweb
    const sdk = ThirdwebSDK.fromPrivateKey(
      process.env.MINTER_PRIVATE_KEY!,
      "polygon"
    );

    const contract = await sdk.getContract(process.env.CONTRACT_ADDRESS!);

    const minted = await contract.erc721.mintTo(wallet_address, {
      metadata: {
        name: "Soul Contribution",
        description: user_text,
        image: metadata.url,
      },
    });

    // 5. Store NFT information back into Supabase
    await supabase
      .from("wizard_submissions")
      .update({
        minted: true,
        token_id: minted.id,
        token_uri: metadata.url,
      })
      .eq("id", submissionId);

    return NextResponse.json({ success: true, minted }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}