import type { StyleProp, ViewStyle } from "react-native";
import type { SvgProps } from "react-native-svg";

import type { IconDefinition, IconVariant } from "../../core/src";

export type { IconDefinition, IconVariant };

export interface IconProps extends Omit<SvgProps, "color" | "style"> {
  variant?: IconVariant;
  size?: number | string;
  color?: string;
  mirrored?: boolean;
  style?: StyleProp<ViewStyle>;
}
