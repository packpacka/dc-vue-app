import * as Vue from 'vue';
import { router } from './router';
import { ymapMixin } from './utils/ymaps/ymaps.mixin';

Vue.mixin(ymapMixin);

/**
 * view instance mount dom node selector
 */
const selector = '#dc-app';

/**
 * instantiate vue app with router
 */
new Vue({
  router,
}).$mount(selector);
