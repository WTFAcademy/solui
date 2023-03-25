import React from "react";
import { AbiItem, AbiInput } from "web3-utils";
import Table from "./Table";

interface ABIFormatterProps {
  abi: AbiItem[];
  onButtonClick: (jsonString: string) => void;
}

const formatInputs = (inputs: AbiInput[]) => {
  return inputs.map((input) => `${input.type} ${input.name}`).join(", ");
};

const ABIFormatter: React.FC<ABIFormatterProps> = ({ abi, onButtonClick }) => {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },

    {
      title: "Inputs",
      dataIndex: "inputs",
      render: (inputs: string) => (
        <div className="w-48 overflow-x-auto whitespace-nowrap">{inputs}</div>
      ),
    },
    {
      title: "Execute",
      dataIndex: "execute",
    },
  ];

  const data = abi.map((item) => ({
    name: item.name || "",
    inputs: formatInputs(item.inputs || []),
    execute: item.name ? (
      <button
        className="bg-blue-500 hover:bg-blue-700 w-48 text-white font-bold py-2 px-4 rounded"
        onClick={() => onButtonClick(JSON.stringify(item))}
      >
        {item.name}
      </button>
    ) : null,
  }));

  return <Table columns={columns} data={data} />;
};

export default ABIFormatter;
