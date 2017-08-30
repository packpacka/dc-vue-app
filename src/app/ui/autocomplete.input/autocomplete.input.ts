import * as Vue from 'vue';
import Component from 'vue-class-component';
import './autocomplete.input.scss';

@Component({
  props: {
    placeholder: {
      type: String,
    },
    getSuggests: {
      type: Function,
      require: true,
    },
    requestDelay: {
      type: Number,
    },
    onSuggestSelect: {
      type: Function,
      require: true,
    },
    minLettersForRequest: {
      type: Number,
      default: 0,
    },
  },
  template: require('./autocomplete.input.tpl'),
})
export class AutocompleteInput extends Vue {
  public suggestions: string[] = [];
  public getSuggests: (search: string) => Promise<string[]>;
  public onSuggestSelect: (suggest: string) => void;
  public minLettersForRequest: number;

  public value: string = '';
  public loading: boolean = false;
  public firstType = true;

  public get showSuggestions() {
    return !this.firstType
      && this.suggestions.length
      && this.value && this.value.length >= this.minLettersForRequest;
  }

  public onInput(value: string) {
    this.value = value;
    this.fillSuggestions(this.value)
      .then(() => this.firstType = false);
  }

  public onBlur() {
    setTimeout(() => {
      this.firstType = true;
    }, 100);
  }

  public selectSuggest(suggest: string) {
    this.value = suggest;
    return this.onSuggestSelect(suggest);
  }

  private fillSuggestions(search: string): Promise<void> {
    if (search && search.length >= this.minLettersForRequest) {
      return this.getSuggests(search).then((suggestions) => {
        this.suggestions = suggestions;
      });
    }
    return Promise.resolve();
  }
}
