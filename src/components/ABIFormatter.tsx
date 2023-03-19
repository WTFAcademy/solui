import React from "react";
import { AbiItem, AbiInput, AbiOutput } from "web3-utils";
import Table from "./Table";

interface ABIFormatterProps {
  abi: AbiItem[];
}

const formatInputs = (inputs: AbiInput[]) => {
  return inputs.map((input) => `${input.type} ${input.name}`).join(", ");
};

const formatOutputs = (outputs: AbiOutput[]) => {
  return outputs.map((output) => `${output.type} ${output.name}`).join(", ");
};

const ABIFormatter: React.FC<ABIFormatterProps> = ({ abi }) => {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Inputs",
      dataIndex: "inputs",
    },
    {
      title: "Outputs",
      dataIndex: "outputs",
    },
  ];

  const data = abi.map((item) => ({
    name: item.name || "",
    type: item.type,
    inputs: formatInputs(item.inputs || []),
    outputs: formatOutputs(item.outputs || []),
  }));

  return <Table columns={columns} data={data} />;
};

export default ABIFormatter;
