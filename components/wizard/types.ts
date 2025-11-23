// components/wizard/types.ts
export interface WizardData {
  audio?: any;
  content?: {
    type: string;
    text: string;
    description: string;
  };
  // Add other wizard step data here
}