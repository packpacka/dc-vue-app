import * as Vue from 'vue';
import * as Vuex from 'vuex';
Vue.use(Vuex);

/**
 * app store interface
 */
export interface AppState {
}

/**
 * default app state
 */
const state: AppState = {};

export const store = new Vuex.Store({
  state,
});
