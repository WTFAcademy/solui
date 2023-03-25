import React, { useState } from "react";
import { AbiItem } from "web3-utils";
import useEthers from "./useEthers";

interface OperateSpaceProps {
  selectedAbiJson: string | null;
  abiList: AbiItem[];
  contractAddress: string;
  providerUrl: string;
}

const OperateSpace: React.FC<OperateSpaceProps> = ({
  selectedAbiJson,
  abiList,
  contractAddress,
  providerUrl,
}) => {
  const [inputValue, setInputValue] = useState("");

  // Replace the placeholders with actual values.
  const { callFunction } = useEthers({
    abi: selectedAbiJson,
    contractAddress,
    providerUrl,
  });

  //   const handleOperateButtonClick = async () => {
  //     if (selectedAbi && selectedAbi.name) {
  //       // Assuming that the input values are comma-separated.
  //       const inputValues = inputValue.split(",").map((value) => value.trim());
  //       await callFunction(selectedAbi.name, inputValues);
  //     }
  //   };

  return (
    <div className="flex justify-center items-center">
      {/* {selectedAbi && selectedAbi.inputs && (
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
          >
            {selectedAbi.name}
          </button>
        </>
      )} */}
    </div>
  );
};

export default OperateSpace;
