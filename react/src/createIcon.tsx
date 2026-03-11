import type { IconDefinition } from "../../core/src";
import { IconBase } from "./IconBase";
import type { IconProps } from "./types";

export function createIcon(icon: IconDefinition) {
  const Component = function RaynaIcon(props: IconProps) {
    return <IconBase icon={icon} {...props} />;
  };

  Component.displayName = icon.pascalName;

  return Component;
}
