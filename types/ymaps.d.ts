import { IYandexMapMixinApi } from '../src/app/utils/ymaps/ymaps.mixin'
import * as VueRouter from 'vue-router';

declare module 'vue/types/vue' {
  interface Vue {
    $ymaps: IYandexMapMixinApi;
  }
}
