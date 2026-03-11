import {
  defineComponent,
  getCurrentInstance,
  h,
  type DefineComponent,
} from "vue";

import type { IconDefinition } from "../../core/src";
import { iconProps, type IconProps } from "./types";

export type RaynaVueIcon = DefineComponent<{
  variant?: "linear" | "bold";
  size?: number | string;
  color?: string;
  mirrored?: boolean;
}>;

function withIdPrefix(body: string, idPrefix: string) {
  return body.replaceAll("__IDPREFIX__", `${idPrefix}-`);
}

function withColor(body: string, color: string) {
  return body.replaceAll("__ICON_COLOR__", color);
}

function mergeStyle(style: unknown, mirrored: boolean) {
  if (!mirrored) {
    return style;
  }

  if (typeof style === "string") {
    return `${style};transform: scaleX(-1); transform-origin: center;`;
  }

  if (Array.isArray(style)) {
    return [...style, { transform: "scaleX(-1)", transformOrigin: "center" }];
  }

  return [style, { transform: "scaleX(-1)", transformOrigin: "center" }];
}

export function createIcon(icon: IconDefinition) {
  return defineComponent({
    name: icon.pascalName,
    inheritAttrs: false,
    props: iconProps,
    setup(props: IconProps, { attrs }) {
      const instance = getCurrentInstance();
      const asset = icon.variants[props.variant ?? "linear"];
      const body = withColor(
        withIdPrefix(asset.body, `rayna-${icon.kebabName}-${instance?.uid ?? 0}`),
        props.color ?? "currentColor"
      );

      return () =>
        h("svg", {
          ...attrs,
          width: props.size ?? 24,
          height: props.size ?? 24,
          viewBox: asset.viewBox,
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          style: mergeStyle(attrs.style, props.mirrored ?? false),
          innerHTML: body,
        });
    },
  }) as RaynaVueIcon;
}
