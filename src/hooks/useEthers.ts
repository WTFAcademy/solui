import { useState, useEffect } from "react";
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

  const callFunction = async (functionName: string, args: any[] = []) => {
    if (contract && provider) {
      try {
        const result = await contract[functionName](...args);
        console.log(`Result:`, result);
        return result; // 添加这一行以返回结果
      } catch (error) {
        console.error(`Error calling function '${functionName}':`, error);
        throw error; // 添加这一行以抛出错误
      }
    } else {
      console.error("Contract or provider not set.");
      throw new Error("Contract or provider not set."); // 添加这一行以抛出错误
    }
  };

  return { callFunction };
};

export default useEthers;
