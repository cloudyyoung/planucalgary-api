import { CatalogSetsProps } from "../types";

interface Hydratable {
  hydrate(sets: Map<String, CatalogSetsProps>): void;
}

export { Hydratable }