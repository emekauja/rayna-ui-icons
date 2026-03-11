export type IconVariant = "linear" | "bold";

export interface IconAsset {
  body: string;
  viewBox: string;
}

export interface IconDefinition {
  name: string;
  pascalName: string;
  sourceName: string;
  kebabName: string;
  aliases: string[];
  searchText: string;
  variants: Record<IconVariant, IconAsset>;
}

export type IconCatalogEntry = Readonly<IconDefinition>;
