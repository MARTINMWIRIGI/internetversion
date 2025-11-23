// components/wizard/types.ts
export interface WizardData {
  audioUrl?: string;
  audioBlob?: Blob;
  content?: {
    type: string;
    text: string;
    description: string;
  };
}