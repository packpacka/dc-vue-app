import { loadYmapsApi, searchGeoObjects } from './ymaps.api';

export interface IYandexMapMixinApi {
    loadYmapsApi: typeof loadYmapsApi;
    searchGeoObjects: typeof searchGeoObjects;
}

const mixinApi: IYandexMapMixinApi = {
    loadYmapsApi,
    searchGeoObjects,
}

export const ymapMixin = {
    created() {
        this.$ymaps = mixinApi;
    },
};