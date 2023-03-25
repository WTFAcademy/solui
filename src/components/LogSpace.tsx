import React from "react";

interface LogSpaceProps {
  logs: string[];
}

const LogSpace: React.FC<LogSpaceProps> = ({ logs }) => {
  return (
    <div className="h-96 overflow-auto bg-white p-4">
      {logs.map((log, index) => (
        <div key={index} className="mb-2">
          {log}
        </div>
      ))}
    </div>
  );
};

export default LogSpace;
