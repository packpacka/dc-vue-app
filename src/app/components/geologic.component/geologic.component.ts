import * as Vue from 'vue';
import * as Vuex from 'vuex';
import Component from 'vue-class-component';
import { store } from "../../store/store";
import { AutocompleteInput } from "../../ui/autocomplete.input/autocomplete.input";


@Component({
  store,
  template: require('./geologic.component.tpl'),
  components: { AutocompleteInput }
})
export class GeoLogicComponent extends Vue {
  public store = store;

  private getAddresses(search: string): Promise<string[]> {
    return this.$ymaps.searchGeoObjects(search)
      .then(suggestion => suggestion.map(s => s.displayName));
  }

  private onAddressSelect(address: string) {
    console.log('selected item', address);
  }
}
