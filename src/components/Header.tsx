import React from "react";
import useWallet from "../hooks/useWallet";

const Header: React.FC = () => {
  const { address, connectWallet } = useWallet();

  const shortenAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md z-10">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <h1 className="text-xl font-semibold">ABI Formatter</h1>
        {address ? (
          <span className="text-sm font-medium bg-gray-200 rounded px-3 py-1">
            {shortenAddress(address)}
          </span>
        ) : (
          <button
            onClick={connectWallet}
            className="bg-blue-600 text-white font-medium px-4 py-2 rounded"
          >
            Connect Wallet
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
