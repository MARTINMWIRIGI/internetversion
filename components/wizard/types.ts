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
  language?: string;
  
  // You can keep the nested structure too if needed elsewhere
  content?: {
    type: string;
    text: string;
    description: string;
  };
  
  // Add any other common wizard properties that might be needed
  // step?: number;
  // completed?: boolean;
  // name?: string;
  // etc.
}