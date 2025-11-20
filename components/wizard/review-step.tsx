import { mintContributionNFT } from "@/lib/mint"; // import helper

export function ReviewStep({ onSubmit, onBack, data, isSubmitting }: ReviewStepProps) {
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      const result = await mintContributionNFT(data); // mint NFT
      console.log("NFT minted:", result);
      onSubmit({ ...data, nftMetadataUrl: result.metadataUrl });
    } catch (err) {
      console.error("Minting failed:", err);
      alert("Failed to mint NFT. Please check wallet and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card className="bg-card/50 border-purple-500/30">
      ...
      <Button
        onClick={handleSubmit}
        disabled={submitting}
        className="bg-gradient-to-r from-green-500 to-cyan-400 text-black font-semibold disabled:opacity-50"
      >
        {submitting ? "Minting NFT..." : "Submit to Vault"}
      </Button>
      ...
    </Card>
  );
}