import type { IconDefinition } from "../../core/src";
import { IconBase } from "./IconBase";
import type { IconProps } from "./types";

export function createIcon(icon: IconDefinition) {
  const Component = function RaynaNativeIcon(props: IconProps) {
    return <IconBase {...props} icon={icon} />;
  };

  Component.displayName = icon.pascalName;

  return Component;
}
