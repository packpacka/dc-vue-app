import * as Vue from 'vue';
import Component from 'vue-class-component';
import './preloader.scss';

@Component({
  template: require('./preloader.tpl'),
})
export class Preloader extends Vue {
}
