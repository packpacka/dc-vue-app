import { loadYmapsApi, searchGeoObjects, getGeoCoordinates } from './ymaps.api';

export interface IYandexMapMixinApi {
  loadYmapsApi: typeof loadYmapsApi;
  searchGeoObjects: typeof searchGeoObjects;
  getGeoCoordinates: typeof getGeoCoordinates;
}

const mixinApi: IYandexMapMixinApi = {
  loadYmapsApi,
  searchGeoObjects,
  getGeoCoordinates,
};

export const ymapMixin = {
  created() {
    this.$ymaps = mixinApi;
  },
};
