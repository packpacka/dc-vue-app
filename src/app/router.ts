import * as Vue from 'vue';
import * as VueRouter from 'vue-router';
import { RouteConfig } from "vue-router/types/router";
import { GeoLogicComponent } from "./components/geologic.component";


Vue.use(VueRouter);

/**
 * application routes
 */
const routes: RouteConfig[] = [
  {path: '/', name: 'home', component: GeoLogicComponent},
];

/**
 * router instance with config
 */
export const router = new VueRouter({
  mode: 'history',
  routes,
});
