import * as Vue from 'vue';
import Component from 'vue-class-component';
import { store } from "../../store/store";


@Component({
    props: {
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
        }
    },
    template: require('./autocomplete.input.tpl'),
})
export class AutocompleteInput extends Vue {
    public value: String = 'test';
    public suggestions: string[] =[];
    public getSuggests: (search: string) => Promise<string[]>;
    public onSuggestSelect: (suggest: string) => void;

    public onInput(e) { //todo: Типизировать
        const value = e.target.value;
        console.log(value);
        this.value = value;
        this.makeRequest(value);
    }

    private makeRequest(search: string) {
        this.getSuggests(search).then((suggestions) => {
            console.log('handle request', suggestions);
            this.suggestions = suggestions;
        });
    }

    private selectSuggest(suggest: string) {
        return this.onSuggestSelect(suggest);
    }
}
