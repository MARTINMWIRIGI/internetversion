// app/wizard/types.ts
export type WizardData = {
  nftName?: string
  nftDescription?: string
  imageData?: string | null
  metadataUrl?: string | null
  audioBlob?: Blob
  audioUrl?: string
}