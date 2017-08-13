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

  private getAddresses(search: string) {
    console.log('make request ', search);
    return Promise.resolve([1,2,3].map(i => `item ${i} for ${search}`));
  }

  private onAddressSelect(addres: string) {
    console.log('selected item', addres);
  }
}
