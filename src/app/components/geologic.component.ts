import * as Vue from 'vue';
import * as Vuex from 'vuex';
import Component from 'vue-class-component';
import { store } from "../store/store";


@Component({
  store,
  template: require('./geologic.component.tpl'),
})
export class GeoLogicComponent extends Vue {
  public store = store;
}