import * as Vue from 'vue';
import * as Vuex from 'vuex';
import { mutations } from './mutations';
import { actions } from './actions';
Vue.use(Vuex);

/**
 * app store interface
 */
export interface AppState {
  selectedAddress?: string;
}

/**
 * default app state
 */
const state: AppState = {};

export const store = new Vuex.Store({
  state,
  mutations: {
    ...mutations,
  },
  actions: {
    ...actions,
  },
});
