import { useRef } from "react";
import type { StyleProp, ViewStyle } from "react-native";
import { SvgXml } from "react-native-svg";

import type { IconDefinition } from "../../core/src";
import type { IconProps } from "./types";

let nextIconId = 0;

function withIdPrefix(body: string, idPrefix: string) {
  return body.replaceAll("__IDPREFIX__", `${idPrefix}-`);
}

function withColor(body: string, color: string) {
  return body.replaceAll("__ICON_COLOR__", color);
}

function buildXml(
  icon: IconDefinition,
  variant: "linear" | "bold",
  color: string,
  idPrefix: string
) {
  const asset = icon.variants[variant];
  const xmlBody = withColor(withIdPrefix(asset.body, idPrefix), color);

  return `<svg viewBox="${asset.viewBox}" fill="none" xmlns="http://www.w3.org/2000/svg">${xmlBody}</svg>`;
}

function mergeStyle(
  style: StyleProp<ViewStyle> | undefined,
  mirrored: boolean
): StyleProp<ViewStyle> | undefined {
  if (!mirrored) {
    return style;
  }

  return [style, { transform: [{ scaleX: -1 }] }];
}

export function IconBase({
  icon,
  variant = "linear",
  size = 24,
  color = "currentColor",
  mirrored = false,
  style,
  ...rest
}: IconProps & { icon: IconDefinition }) {
  const instanceId = useRef(nextIconId++);
  const asset = icon.variants[variant];
  const xml = buildXml(icon, variant, color, `rayna-${instanceId.current}`);

  return (
    <SvgXml
      {...rest}
      xml={xml}
      width={size}
      height={size}
      viewBox={asset.viewBox}
      style={mergeStyle(style, mirrored)}
    />
  );
}
