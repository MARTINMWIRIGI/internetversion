// types/wizard.ts
export interface WizardData {
  // Audio step properties
  audioUrl?: string;
  audioBlob?: Blob;
  
  // Content step properties
  contentType?: string;
  words?: string;
  definition?: string;
  context?: string;
  
  // You can keep the nested structure too if needed elsewhere
  content?: {
    type: string;
    text: string;
    description: string;
  };
}