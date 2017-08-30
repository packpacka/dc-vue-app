import * as Vue from 'vue';
import Component from 'vue-class-component';
import { store } from '../../store/store';

@Component({
  store,
  template: require('./map.component.tpl'),
  props: {
    lat: {
      type: Number,
      required: true,
    },
    lng: {
      type: Number,
      required: true,
    },
  },
})
export class MapComponent extends Vue {
  public store = store;
}
