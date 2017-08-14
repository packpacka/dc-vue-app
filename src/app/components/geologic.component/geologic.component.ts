import * as Vue from 'vue';
import Component from 'vue-class-component';
import { store } from '../../store/store';
import { AutocompleteInput } from '../../ui/autocomplete.input/autocomplete.input';

@Component({
  store,
  template: require('./geologic.component.tpl'),
  components: { AutocompleteInput },
})
export class GeoLogicComponent extends Vue {
  public store = store;

  public getAddresses(search: string): Promise<string[]> {
    return this.$ymaps.searchGeoObjects(search)
      .then(suggestion => suggestion.map(s => s.displayName));
  }

  public onAddressSelect(address: string) {
    console.log('selected item', address);
  }
}
