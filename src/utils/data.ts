export type BaseLayer = 'Grayscale' | 'Streets' | 'Satelitte';

export interface Geometry {
  type: string;
  coordinates: any[];
}

export interface GeoJSONFeature {
  type: 'Feature';
  geometry: Geometry;
  [key: string]: any;
}

export interface GeoJSONData {
  type: 'FeatureCollection';
  features: GeoJSONFeature[];
  [key: string]: any;
}

export interface PluginIndex {
  [name: string]: {
    exportName: string;
    tagName: string;
    path: string;
    for?: string;
  };
}

export interface DataIndex {
  geoJSONUrl?: string;
  metadataUrlTemplate?: string;
  dataUrlTemplate?: string;
  matrixDataUrl?: string;
  minLatitude?: number;
  maxLatitude?: number;
  minLongitude?: number;
  maxLongitude?: number;
}

export interface LayerMetadata {
  [id: string]: {
    data: any;
  };
}

export interface LayerData {
  [id: string]: {
    data: {
      [year: string]: {
        [timestamp: string]: {
          total: number;
          min: number;
          max: number;
          average: number;
          value: number[];
        };
      };
    };
  };
}

export interface OverlayLayer {
  type?: 'shape' | 'matrix';
  name: string;
  dataIndexUrl?: string;
  colorMap?: [number, number, string, string?][];
  variable?: string;
  plot?: 'scatter' | 'contour';
  thresholds?: number | number[];
  colors?: { [value: number]: string };
  colorRange?: [string, string];
  pointRadius?: number;
  colorScheme?: string;
}

export interface PluginData {
  name?: string;
  plugins?: PluginData[];
  pluginIndex?: PluginIndex;
  [prop: string]: any;
}

export interface LongbarData extends PluginData {
  width?: string;
  layerDataMap?: Map<OverlayLayer, LayerData>;
  layerMetadataMap?: Map<OverlayLayer, LayerMetadata>;
  yearRange?: [number, number];
  pinAndColorMap: Map<SidebarSelection, string>;
  title?: string;
}

export interface LongbarLineChartData extends PluginData {
  granularity?: string;
  pinAndColorMap: Map<SidebarSelection, string>;
  layerDataMap?: Map<OverlayLayer, LayerData>;
  layerMetadataMap?: Map<OverlayLayer, LayerMetadata>;
  yearRange?: [number, number];
  variables: string[];
  title?: string;
}

export interface SidebarChartData extends PluginData {
  granularity?: string;
  selection?: { layer: OverlayLayer; id: string | number };
  layerDataMap?: Map<OverlayLayer, LayerData>;
  layerMetadataMap?: Map<OverlayLayer, LayerMetadata>;
  yearRange?: [number, number];
  variables: string[];
  title?: string;
}

export interface SidebarMetadataData extends PluginData {
  selection?: { layer: OverlayLayer; id: string | number };
  layerMetadataMap?: Map<OverlayLayer, LayerMetadata>;
}

export interface SidebarData extends PluginData {
  width?: string;
  selection?: SidebarSelection;
  layerDataMap?: Map<OverlayLayer, LayerData>;
  layerMetadataMap?: Map<OverlayLayer, LayerMetadata>;
  yearRange?: [number, number];
  updateSelection: (selection: SidebarSelection) => void;
  updatePinAndColorMap: (pinAndColorMap: Map<SidebarSelection, string>) => void;
}

export interface SidebarSelection {
  layer: OverlayLayer;
  id: string | number;
}

export interface LegendData extends PluginData {
  width?: string;
  selection?: { layer: OverlayLayer; id: string | number };
  layerDataMap?: Map<OverlayLayer, LayerData>;
  variable?: string;
  colorMap: [number, number, string, string?][];
  valueColorPairs?: [number, string][];
  continuous?: boolean;
}

export interface TimeControlData extends PluginData {
  width?: string;
  yearRange: [number, number];
  layerDataMap?: Map<OverlayLayer, LayerData>;
  layerMetadataMap?: Map<OverlayLayer, LayerMetadata>;
  timestamp: { year: string; timestamp: string };
  timestampsPerSecond: number;
  updateTime?: (year: string, timestamp: string) => void;
}

export interface MainData extends PluginData {
  pluginIndexUrl: string;
  baseLayers: BaseLayer[];
  overlayLayers: OverlayLayer[];
  yearRange: [number, number];
}
