import React, { useState } from "react";
import { AbiItem } from "web3-utils";
import useEthers from "../hooks/useEthers";

interface OperateSpaceProps {
  selectedAbi: AbiItem | null;
  abi: any;
  contractAddress: string;
  providerUrl: string;
  onLog: (message: string) => void;
}

const OperateSpace: React.FC<OperateSpaceProps> = ({
  selectedAbi,
  abi,
  contractAddress,
  providerUrl,
  onLog,
}) => {
  const [inputValue, setInputValue] = useState("");
  const { callFunction } = useEthers({ abi, contractAddress, providerUrl });
  const [isLoading, setIsLoading] = useState(false);

  const handleOperateButtonClick = async () => {
    if (selectedAbi && selectedAbi.name) {
      setIsLoading(true);
      const functionName = selectedAbi.name;
      // Split inputValue into an array of values, allowing empty input
      const inputValues =
        inputValue === ""
          ? []
          : inputValue.split(",").map((value) => value.trim());

      try {
        const result = await callFunction(functionName, inputValues);
        onLog(`Result: ${JSON.stringify(result)}`);
      } catch (error) {
        const typedError = error as Error;
        onLog(`Error: ${typedError.message}`);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="flex justify-center items-center">
      {selectedAbi && selectedAbi.inputs && (
        <>
          <input
            className="w-2/3 p-2 border border-gray-300 rounded"
            type="text"
            placeholder={selectedAbi.inputs
              .map((input) => `${input.type} ${input.name}`)
              .join(", ")}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button
            className="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleOperateButtonClick}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : selectedAbi.name}
          </button>
        </>
      )}
    </div>
  );
};

export default OperateSpace;
