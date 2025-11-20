import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { NFTStorage, File } from "nft.storage";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";

export async function POST(req: Request) {
  try {
    const { walletAddress, text } = await req.json();

    // Validate
    if (!walletAddress || !text) {
      return NextResponse.json({ error: "Missing walletAddress or text" }, { status: 400 });
    }

    // 1️⃣ Insert submission into Supabase
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE!
    );

    const { data: inserted, error: insertErr } = await supabase
      .from("wizard_submissions")
      .insert({
        wallet_address: walletAddress,
        user_text: text,
        minted: false, // a field to mark later
      })
      .select()
      .single();

    if (insertErr) {
      console.error("Supabase insert error:", insertErr);
      return NextResponse.json({ error: insertErr.message }, { status: 500 });
    }

    const submissionId = inserted.id;

    // 2️⃣ Upload metadata to NFT.Storage
    const client = new NFTStorage({ token: process.env.NFT_STORAGE_KEY! });

    const metadata = await client.store({
      name: "Soul Internet Contribution",
      description: text,
      image: new File(
        [Buffer.from(text)],   // using text as image (or you can change)
        "contribution.txt",
        { type: "text/plain" }
      ),
      properties: {
        contributed_text: text,
      },
    });

    const metadataURI = metadata.url; // ipfs://...

    // 3️⃣ Mint via Thirdweb
    const sdk = ThirdwebSDK.fromPrivateKey(process.env.MINTER_PRIVATE_KEY!, "polygon");
    const contract = await sdk.getContract(process.env.CONTRACT_ADDRESS!);

    const mintResult = await contract.erc721.mintTo(walletAddress, {
      uri: metadataURI,
    });

    // 4️⃣ Update Supabase row to include minted info
    await supabase
      .from("wizard_submissions")
      .update({
        minted: true,
        token_uri: metadataURI,
        // if your contract returns an ID or you want to fetch it, store it
        token_id: mintResult.id ?? null,
      })
      .eq("id", submissionId);

    // 5️⃣ Return success
    return NextResponse.json({
      success: true,
      submissionId,
      metadataURI,
      mintResult,
    });
  } catch (err: any) {
    console.error("Error in /api/submissions:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}