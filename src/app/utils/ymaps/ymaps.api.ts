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

export interface IYmaps {
  Map: new (id: string, state: IYmapsMapConstructorState, options?: IYmapsMapConstructorOptions) => IYmapsMap;
  Placemark: any; // tslint:disable-line: no-any
  ready(cb: () => void): void;
  load(modules: string[], cb: (ymaps: IYmaps) => void, errback: (err: Error) => void): void;
  suggest(query: string, options?: IYmapsSuggestOptions): Promise<IYmapsSuggestion[]>;
}

export interface IYmapsMapConstructorState {
  center: YMapsCoords;
  zoom: number;
}

export interface IYmapsMapConstructorOptions {
  autoFitToViewport?: 'always';
}

export type YMapsCoords = [number, number];
export type Vector = [YMapsCoords, YMapsCoords];
export type YMapsBoundedBox = Vector;

export interface IYmapsMap {
  container: {
    getSize: () => [number, number],
  };
  setBounds: (bounds: YMapsBoundedBox, options?: IYmapsMapSetBoundsOptions) => void;
  getBounds: () => YMapsBoundedBox;
  getZoom: () => number;
  // tslint:disable-next-line:no-any
  options: any;
  // tslint:disable-next-line:no-any
  converter: any;
}

export interface IYmapsMapSetBoundsOptions {
  // tslint:disable-next-line:no-any
  callback?: (err?: any) => void;
  checkZoomRange?: boolean;
}

export type MapCenterAndZoom = {
  center: YMapsCoords;
  zoom: number;
};

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

export type YMapModule = 'suggest';

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
