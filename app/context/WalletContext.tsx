import React, { ReactNode, createContext, useState } from "react";

interface Props {
  children: ReactNode;
}

interface ContextProps {
  metamaskAdd: string | null;
  phantomAdd: string | null;
}
interface walletsContext extends ContextProps {
  setMetamask: (add: string | null) => void;
  setPhantomAdd: (add: string | null) => void;
}

const WalletAddContext = createContext<walletsContext>({} as walletsContext);

const AppWalletAddProvider: React.FC<Props> = ({ children }) => {
  const [metamaskAdd, setMetamask] = useState<string | null>(null);
  const [phantomAdd, setPhantomAdd] = useState<string | null>(null);

  return (
    <WalletAddContext.Provider
      value={{ metamaskAdd, setMetamask, phantomAdd, setPhantomAdd }}
    >
      {children}
    </WalletAddContext.Provider>
  );
};

export { WalletAddContext, AppWalletAddProvider };
