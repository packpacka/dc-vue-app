import * as Vue from 'vue';
import * as VueRouter from 'vue-router';
import { RouteConfig } from "vue-router/types/router";
import { HomePage } from "./pages/home.page/home.page";
import { MapPage } from "./pages/map.page/map.page";


Vue.use(VueRouter);

/**
 * application routes
 */
const routes: RouteConfig[] = [
  {path: '/', name: 'home', component: HomePage},
  {path: '/map', name: 'map', component: MapPage},
];

/**
 * router instance with config
 */
export const router = new VueRouter({
  mode: 'history',
  routes,
});
