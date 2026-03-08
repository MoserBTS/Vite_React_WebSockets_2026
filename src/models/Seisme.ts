export type Geometry = {
  "type": string;
  coordinates: number[];
}

export type Properties = {
  source_id: string;
  source_catalog: string;
  lastupdate: string;
  time: string;
  flynn_region: string;
  lat: number;
  lon: number;
  depth: number;
  evtype: string;
  auth: string;
  mag: number;
  magtype: string;
  unid: string;
}

export type Data = {
  "type": string;
  geometry: Geometry;
  id: string;
  properties: Properties;
}

export type Root = {
  action: string;
  data: Data;
}