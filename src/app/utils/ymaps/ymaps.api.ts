declare const window: Window & {
  ymaps: IYmaps;
};

let ymapsPromise: Promise<IYmaps> | undefined;

export interface IYmapsSuggestion {
  displayName: string;
  hl: [number, number][];
  type: string;
  value: string;
}

export interface IYmapsGeocodeResult {
  // tslint:disable-next-line:no-any
  geoObjects: any;
}

export interface IYmaps {
  Map: new (id: string, state: IYmapsMapConstructorState, options?: IYmapsMapConstructorOptions) => IYmapsMap;
  Placemark: any; // tslint:disable-line: no-any
  ready(cb: () => void): void;
  load(modules: string[], cb: (ymaps: IYmaps) => void, errback: (err: Error) => void): void;
  suggest(query: string, options?: IYmapsSuggestOptions): Promise<IYmapsSuggestion[]>;
  geocode(query: string): Promise<IYmapsGeocodeResult>;
}

export interface IYmapsMapConstructorState {
  center: YMapsCoords;
  zoom?: number;
}

export interface IYmapsMapConstructorOptions {
  autoFitToViewport?: 'always';
}

export type YMapsCoords = [number, number];
export type Vector = [YMapsCoords, YMapsCoords];
export type YMapsBoundedBox = Vector;

export interface IYmapsMap {
  geoObjects: IYmapsGeoObjects;
}

export interface IYmapsGeoObjects {
  // tslint:disable-next-line:no-any
  add(object: any): void;
  // tslint:disable-next-line:no-any
  get(index: number): any;
}

export interface IYmapsMapSetBoundsOptions {
  // tslint:disable-next-line:no-any
  callback?: (err?: any) => void;
  checkZoomRange?: boolean;
}

export interface IYmapsSuggestOptions {
  boundedBy?: YMapsBoundedBox;
  strictBounds?: boolean;
}

function insertScriptToLoadYmaps(): Promise<IYmaps> {
  return new Promise((resolve, reject) => {
    if (window.ymaps) {
      resolve(window.ymaps);
      return;
    }

    const scriptTag = window.document.createElement('script');

    function clean() {
      window.document.body.removeChild(scriptTag);
    }

    scriptTag.src = 'https://enterprise.api-maps.yandex.ru/2.1/?' +
      'apikey=ad7bd5e9-cdc2-47b7-8455-8d4800185ea7&lang=ru-RU&load=Map';
    scriptTag.async = true;
    scriptTag.defer = true;
    scriptTag.onload = () => {
      window.ymaps.ready(() => {
        resolve(window.ymaps);
        clean();
      });
    };
    scriptTag.onerror = () => {
      reject(new Error('Unable to load Yandex Maps API'));
      clean();
    };
    window.document.body.appendChild(scriptTag);
  });
}

export type YMapModule = 'suggest' | 'geocode' | 'Map' | 'Placemark' | 'geoObject.addon.balloon';

function tryToLoadYmapsApi(modules: YMapModule[]): Promise<IYmaps> {
  if (!ymapsPromise) {
    ymapsPromise = insertScriptToLoadYmaps();
  }

  return ymapsPromise
    .then(ymaps => {
      return new Promise<IYmaps>((resolve, reject) => {
        ymaps.load(modules, () => {
          resolve(ymaps);
        }, reject);
      });
    });
}

export function loadYmapsApi(modules: YMapModule[]): Promise<IYmaps> {
  return tryToLoadYmapsApi(modules)
    .catch(() => {
      ymapsPromise = undefined;
      return tryToLoadYmapsApi(modules);
    });
}

export function searchGeoObjects(search: string): Promise<IYmapsSuggestion[]> {
  return loadYmapsApi(['suggest']).then(ymaps => ymaps.suggest(search));
}

interface ICoordinates {
  lat: number;
  lng: number;
}

export const getGeoCoordinates = (geo: string): Promise<ICoordinates> => {
  return loadYmapsApi(['geocode'])
    .then(ymaps => ymaps.geocode(geo))
    .then(res => {
      const first = res.geoObjects.get(0);
      const [lat, lng] = first.geometry.getCoordinates();
      return { lat, lng };
    });
};

interface IInitMapResponse {
  ymaps: IYmaps;
  map: IYmapsMap;
}
export const initMap = (mapId: string, options?: IYmapsMapConstructorState): Promise<IInitMapResponse> => {
  return loadYmapsApi(['Map', 'Placemark', 'geoObject.addon.balloon']).then(ymaps => {
    return {
      map: new ymaps.Map(mapId, options),
      ymaps: ymaps,
    };
  });
};
