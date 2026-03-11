import { useId } from "react";

import type { IconDefinition } from "../../core/src";
import type { IconProps } from "./types";

function withIdPrefix(body: string, idPrefix: string) {
  return body.replaceAll("__IDPREFIX__", `${idPrefix}-`);
}

function withColor(body: string, color: string) {
  return body.replaceAll("__ICON_COLOR__", color);
}

function mergeTransform(
  mirrored: boolean | undefined,
  transform: string | undefined
) {
  if (!mirrored) {
    return transform;
  }

  return transform ? `scaleX(-1) ${transform}` : "scaleX(-1)";
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
  const idPrefix = useId().replaceAll(":", "");
  const asset = icon.variants[variant];
  const body = withColor(withIdPrefix(asset.body, idPrefix), color);

  return (
    <svg
      {...rest}
      width={size}
      height={size}
      viewBox={asset.viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        ...style,
        transform: mergeTransform(mirrored, style?.transform),
        transformOrigin: "center",
      }}
      aria-hidden={rest["aria-label"] ? undefined : true}
      focusable={rest["aria-label"] ? undefined : false}
      dangerouslySetInnerHTML={{ __html: body }}
    />
  );
}
