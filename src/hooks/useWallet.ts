import { useState } from "react";

const useWallet = () => {
  const [address, setAddress] = useState<string | null>(null);

  const connectWallet = () => {
    setAddress("0x742d35Cc6634C0532925a3b844Bc454e4438f44e");
  };

  return {
    address,
    connectWallet,
  };
};

export default useWallet;
