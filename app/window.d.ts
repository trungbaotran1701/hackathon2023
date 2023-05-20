declare global {
  interface Window {
    ethereum?: {
      isMetaMask?: true;
      request?: (...args: any[]) => Promise<any>;
      selectedAddress?: null | string;
    };
  }
}

// If this was an import instead of a declare module, it would be active
export {};
