import { loadYmapsApi, searchGeoObjects, getGeoCoordinates, initMap } from './ymaps.api';

export interface IYandexMapMixinApi {
  loadYmapsApi: typeof loadYmapsApi;
  searchGeoObjects: typeof searchGeoObjects;
  getGeoCoordinates: typeof getGeoCoordinates;
  initMap: typeof initMap;
}

const mixinApi: IYandexMapMixinApi = {
  loadYmapsApi,
  searchGeoObjects,
  getGeoCoordinates,
  initMap,
};

export const ymapMixin = {
  created() {
    this.$ymaps = mixinApi;
  },
};
