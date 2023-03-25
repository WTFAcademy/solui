import { useState, useEffect } from "react";
import { AbiItem } from "web3-utils";
import { JsonRpcProvider, Contract } from "ethers";

interface UseEthersProps {
  abi: any;
  contractAddress: string;
  providerUrl: string;
}

const useEthers = ({ abi, contractAddress, providerUrl }: UseEthersProps) => {
  const [provider, setProvider] = useState<JsonRpcProvider | null>(null);
  const [contract, setContract] = useState<Contract | null>(null);

  useEffect(() => {
    if (abi && contractAddress && providerUrl) {
      const provider = new JsonRpcProvider(providerUrl);
      const contract = new Contract(contractAddress, abi, provider);
      setProvider(provider);
      setContract(contract);
    } else {
      setProvider(null);
      setContract(null);
    }
  }, [abi, contractAddress, providerUrl]);

  const callFunction = async (functionName: string, args: any[]) => {
    if (contract && provider) {
      try {
        const result = await contract[functionName](...args);
        console.log(`Result:`, result);
      } catch (error) {
        console.error(`Error calling function '${functionName}':`, error);
      }
    } else {
      console.error("Contract or provider not set.");
    }
  };

  return { callFunction };
};

export default useEthers;
