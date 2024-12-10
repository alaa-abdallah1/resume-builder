import { SvgIconName } from "@/assets/icons/paths.svg";
import { SVGAttributes } from "react";

export interface IICon extends SVGAttributes<SVGElement> {
  name: SvgIconName;
  size?: string | number;
  fill?: string;
  viewBox?: string;
  customClass?: string;
}
