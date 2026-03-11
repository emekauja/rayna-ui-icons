import type { PropType, SVGAttributes } from "vue";

import type { IconDefinition, IconVariant } from "../../core/src";

export type { IconDefinition, IconVariant };

export interface IconProps extends SVGAttributes {
  variant?: IconVariant;
  size?: number | string;
  color?: string;
  mirrored?: boolean;
}

export const iconProps = {
  variant: {
    type: String as PropType<IconVariant>,
    default: "linear",
  },
  size: {
    type: [Number, String] as PropType<number | string>,
    default: 24,
  },
  color: {
    type: String,
    default: "currentColor",
  },
  mirrored: {
    type: Boolean,
    default: false,
  },
} as const;
