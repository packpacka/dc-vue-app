import { IYandexMapMixinApi } from '../../src/app/utils/ymaps/ymaps.mixin'

declare module 'vue/types/vue' {
  interface Vue {
    $ymaps: IYandexMapMixinApi;
  }
}
