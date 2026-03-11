import type { SVGProps } from "react";
import type { IconDefinition, IconVariant } from "../../core/src";

export type { IconDefinition, IconVariant };

export interface IconProps extends Omit<SVGProps<SVGSVGElement>, "color"> {
  variant?: IconVariant;
  size?: number | string;
  color?: string;
  mirrored?: boolean;
}
