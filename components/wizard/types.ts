// types/wizard.ts
export interface WizardData {
  // Audio Step
  audioUrl?: string;
  audioBlob?: Blob;
  
  // Content Step
  contentType?: string;
  words?: string;
  definition?: string;
  context?: string;
  language?: string;
  
  // Metadata Step
  pronunciation?: string;
  walletAddress?: string;
  videoUrl?: string;
  
  // Optional nested structure
  content?: {
    type: string;
    text: string;
    description: string;
  };
  
  // Common properties that might be useful
  step?: number;
  completed?: boolean;
}