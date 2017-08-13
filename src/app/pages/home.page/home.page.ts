import * as Vue from 'vue';
import * as Vuex from 'vuex';
import Component from 'vue-class-component';
import { store } from "../../store/store";
import { GeoLogicComponent } from '../../components/geologic.component/geologic.component';


@Component({
  store,
  template: require('./home.page.tpl'),
  components: {
    GeoLogicComponent,
  }
})
export class HomePage extends Vue {
  public store = store;
}