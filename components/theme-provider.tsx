// theme-provider.tsx
"use client";

import { ReactNode } from "react";
import { ThirdwebProvider, metamaskWallet } from "@thirdweb-dev/react";
import { ChainId } from "@thirdweb-dev/sdk";

export default function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <ThirdwebProvider
      activeChain={ChainId.Polygon} // Polygon mainnet
      supportedWallets={[metamaskWallet()]}
    >
      {children}
    </ThirdwebProvider>
  );
}