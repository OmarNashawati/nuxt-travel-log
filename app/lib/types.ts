/* eslint-disable ts/consistent-type-definitions */
import type { Map, MapEventType } from "maplibre-gl";
import type { ComponentInternalInstance, Raw } from "vue";

import type { UserWithId } from "./auth";

declare module 'h3' {
  interface H3EventContext {
    user?: UserWithId;
  }
}

export type LatLongItem = {
  lat: number;
  long: number;
}

export type MapPoint = {
  id: number;
  name: string;
  description: string | null;
} & LatLongItem


export interface MglEvent<T extends keyof MapEventType> {
  type: string;
  component: Raw<ComponentInternalInstance>;
  map: Map;
  event: MapEventType[T];
}

export interface NominatimResult {
  place_id:     number;
  licence:      string;
  osm_type:     string;
  osm_id:       number;
  lat:          string;
  lon:          string;
  class:        string;
  type:         string;
  place_rank:   number;
  importance:   number;
  addresstype:  string;
  name:         string;
  display_name: string;
  boundingbox:  string[];
}
