import * as Vue from 'vue';
import Component from 'vue-class-component';
import { store } from '../../store/store';
import { MapComponent } from '../../components/map.component/map.component';

@Component({
  store,
  template: require('./map.page.tpl'),
  components: {
    MapComponent,
  },
})
export class MapPage extends Vue {
  public store = store;
  public lat = Number(this.$route.query.lat);
  public lng = Number(this.$route.query.lng);
  public title = this.$route.query.title || '';
}
