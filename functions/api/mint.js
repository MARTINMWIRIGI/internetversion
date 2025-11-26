import { ethers } from 'ethers';

export async function onRequestPost({ request, env }) {
  try {
    const body = await request.json();

    // Example: connect to Ethereum via Infura or Alchemy
    const provider = new ethers.JsonRpcProvider(env.ETH_RPC_URL);
    const wallet = new ethers.Wallet(env.PRIVATE_KEY, provider);
    const contract = new ethers.Contract(
      env.CONTRACT_ADDRESS,
      JSON.parse(env.CONTRACT_ABI),
      wallet
    );

    // Mint NFT (replace with your contract's actual function)
    const tx = await contract.mint(body.to, body.tokenId);
    await tx.wait();

    return new Response(JSON.stringify({ success: true, txHash: tx.hash }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ success: false, error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}