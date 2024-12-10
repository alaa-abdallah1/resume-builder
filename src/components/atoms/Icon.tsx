import React from "react";
import { svgPaths } from "@/assets/icons/paths.svg";
import { IICon } from "@/types/icon";

interface IconProps extends IICon {
  size?: number;
  fill?: string;
  viewBox?: string;
  customClass?: string;
}

export const Icon: React.FC<IconProps> = (props: IconProps) => {
  const { size = 16, viewBox = "0 0 24 24", name } = props;
  const iconPath = svgPaths[name];

  if (!iconPath) {
    console.warn(`Icon "${name}" not found in svgPaths`);
  }

  return (
    <svg {...props} width={size} height={size} viewBox={viewBox}>
      <path d={iconPath} />
    </svg>
  );
};

export default Icon;
