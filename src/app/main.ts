import * as Vue from 'vue';
import * as VueRouter from 'vue-router';
import * as Vuex from 'vuex';
import * as vScroll from 'vue-scroll'
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
const vm = new Vue({
  router,
}).$mount(selector);
