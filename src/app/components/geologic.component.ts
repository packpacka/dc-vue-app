import * as Vue from 'vue';
import * as Vuex from 'vuex';
import Component from 'vue-class-component';
import { store } from "../store/store";


@Component({
  store,
  template: `
    <div>
      <h1>geologic</h1>
      <input type="text" />
      <button disabled>я здесь</button>
    </div>
  `,
})
export class GeoLogicComponent extends Vue {
  public store = store;
}