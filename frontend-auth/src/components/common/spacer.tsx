import React from "react";

type SpacerProps = {
  height?: number;
};

export const Spacer: React.FC<SpacerProps> = ({ height = 100 }) => {
  return <div style={{ height: `${height}px` }}></div>;
};