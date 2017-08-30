import * as Vue from 'vue';
import Component from 'vue-class-component';
import { store } from '../../store/store';
import { YMapsCoords } from '../../utils/ymaps/ymaps.api';
import './map.component.scss';

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
    title: {
      type: String,
      default: '',
    },
  },
})
export class MapComponent extends Vue {
  public lat: number;
  public lng: number;
  public title: number;

  public store = store;
  public mapId = 'address-map';

  public mounted() {
    const coords: YMapsCoords = [this.lat, this.lng];
    this.$ymaps.initMap(this.mapId, {
      center: coords,
      zoom: 15,
    }).then(({ map, ymaps }) => {
      const placemark = new ymaps.Placemark([this.lat, this.lng], {
        balloonContent: this.title,
      }, {
        hideIconOnBalloonOpen: false,
      });

      map.geoObjects.add(placemark);
    });
  }
}
