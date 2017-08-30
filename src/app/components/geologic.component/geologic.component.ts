import * as Vue from 'vue';
import Component from 'vue-class-component';
import { store } from '../../store/store';
import { AutocompleteInput } from '../../ui/autocomplete.input/autocomplete.input';
import './geologic.component.scss';

@Component({
  store,
  template: require('./geologic.component.tpl'),
  components: { AutocompleteInput },
})
export class GeoLogicComponent extends Vue {
  public store = store;
  public selectedAddress: string = '';

  public getAddresses(search: string): Promise<string[]> {
    return this.$ymaps.searchGeoObjects(search)
      .then(suggestion => suggestion.map(s => s.displayName));
  }

  public onAddressSelect(address: string) {
    this.selectedAddress = address;
  }

  public onType() {
    this.selectedAddress = '';
  }

  public onBtnClick() {
    console.log('go to map');
  }
}
