// tslint:disable:no-unused-expression
import 'core-js/es6/promise';
import * as Vue from 'vue';
import { AutocompleteInput, REQUEST_DELAY } from './autocomplete.input';

// tslint:disable-next-line:no-any
const mount = (component: any, props: { [key: string]: any }): any => {
  if (props == null) {
    return new Vue(component).$mount();
  } else {
    const VueComponentClass = Vue.extend(component);
    return new VueComponentClass({ propsData: props }).$mount();
  }
};

describe('AutocompleteInput', () => {
  it('render passed value in input', (done) => {
    const vm = mount(AutocompleteInput, { value: 'val1', getSuggestions: () => Promise.resolve([1]) });

    expect(vm.$el.querySelector('input').value).toEqual('val1');

    vm.value = 'val2';
    Vue.nextTick(() => {
      expect(vm.$el.querySelector('input').value).toEqual('val2');
      vm.$destroy();
      done();
    });
  });

  it('render list items only if has suggestion is focused and was typing after focus and input value length more then minLettersForRequest', (done) => {
    const vm = mount(AutocompleteInput, {
      value: 'val1',
      minLettersForRequest: 1,
      getSuggestions: () => Promise.resolve(['item1', 'item2']),
    });

    const input = vm.$el.querySelector('input');
    input.dispatchEvent(new Event('input'));

    Vue.nextTick(() => {
      setTimeout(() => {
        const listItems = vm.$el.querySelector('ul');
        expect(vm.showSuggestions).toBeTruthy();
        expect(listItems).not.toBeNull();
        vm.$destroy();
        done();
      }, REQUEST_DELAY);
    });
  });

  it('not render list items if suggestions is empty', (done) => {
    const vm = mount(AutocompleteInput, {
      value: 'val1',
      minLettersForRequest: 1,
      getSuggestions: () => Promise.resolve([]),
    });

    const input = vm.$el.querySelector('input');
    input.dispatchEvent(new Event('input'));

    Vue.nextTick(() => {
      setTimeout(() => {
        const listItems = vm.$el.querySelector('ul');
        expect(vm.showSuggestions).toBeFalsy();
        expect(listItems).toBeNull();
        vm.$destroy();
        done();
      }, REQUEST_DELAY);
    });
  });

  it('not render list if value length less than minLettersForRequest prop', (done) => {
    const vm = mount(AutocompleteInput, {
      value: 'val1',
      minLettersForRequest: 5,
      getSuggestions: () => Promise.resolve(['item1', 'item2']),
    });

    const input = vm.$el.querySelector('input');
    input.dispatchEvent(new Event('input'));

    Vue.nextTick(() => {
      setTimeout(() => {
        const listItems = vm.$el.querySelector('ul');
        expect(vm.showSuggestions).toBeFalsy();
        expect(listItems).toBeNull();
        vm.$destroy();
        done();
      }, REQUEST_DELAY);
    });
  });

  it('not render list if was no type after focus', (done) => {
    const vm = mount(AutocompleteInput, {
      value: 'val1',
      minLettersForRequest: 1,
      getSuggestions: () => Promise.resolve(['item1', 'item2']),
    });

    const input = vm.$el.querySelector('input');
    input.dispatchEvent(new Event('focus'));

    Vue.nextTick(() => {
      setTimeout(() => {
        const listItems = vm.$el.querySelector('ul');
        expect(vm.showSuggestions).toBeFalsy();
        expect(listItems).toBeNull();
        vm.$destroy();
        done();
      }, REQUEST_DELAY);
    });
  });

  it('hide list on focuse leave', (done) => {
    const vm = mount(AutocompleteInput, {
      value: 'val1',
      minLettersForRequest: 1,
      getSuggestions: () => Promise.resolve(['item1', 'item2']),
    });

    const input = vm.$el.querySelector('input');
    input.dispatchEvent(new Event('input'));

    Vue.nextTick(() => {
      setTimeout(() => {
        Vue.nextTick(() => {
          input.dispatchEvent(new Event('blur'));
          setTimeout(() => {
            const listItems = vm.$el.querySelector('ul');
            expect(vm.showSuggestions).toBeFalsy();
            expect(listItems).toBeNull();
          }, 100);
        });
        done();
      }, REQUEST_DELAY);
    });
  });

  it('call getSuggestions callback on type with input value as argument', (done) => {
    const getSuggestionSpy = jasmine.createSpy('getSuggestions');

    const vm = mount(AutocompleteInput, {
      value: 'val1',
      minLettersForRequest: 1,
      getSuggestions: (val) => { getSuggestionSpy(val); return Promise.resolve([val]); },
    });

    const input = vm.$el.querySelector('input');
    input.dispatchEvent(new Event('input'));

    setTimeout(() => {
      expect(getSuggestionSpy).toHaveBeenCalledWith('val1');
      vm.$destroy();
      done();
    }, REQUEST_DELAY);
  });

  it('call getSuggestions callback on type with input after REQUEST_DELAY timeout', (done) => {
    const getSuggestionSpy = jasmine.createSpy('getSuggestions');

    const vm = mount(AutocompleteInput, {
      value: 'val1',
      minLettersForRequest: 1,
      getSuggestions: (val) => { getSuggestionSpy(val); return Promise.resolve([val]); },
    });

    const input = vm.$el.querySelector('input');
    input.dispatchEvent(new Event('input'));

    expect(getSuggestionSpy).not.toHaveBeenCalled();
    setTimeout(() => {
      expect(getSuggestionSpy).toHaveBeenCalled();
      vm.$destroy();
      done();
    }, REQUEST_DELAY);
  });

  it('render items returned by getSuggestions props-method as list items', (done) => {
    const vm = mount(AutocompleteInput, {
      value: 'val1',
      minLettersForRequest: 1,
      getSuggestions: () => Promise.resolve(['item1', 'item2']),
    });

    const input = vm.$el.querySelector('input');
    input.dispatchEvent(new Event('input'));

    Vue.nextTick(() => {
      setTimeout(() => {
        const listItems = vm.$el.querySelectorAll('li');
        expect(listItems.length).toEqual(2);
        expect(listItems[0].textContent).toEqual('item1');
        expect(listItems[1].textContent).toEqual('item2');
        vm.$destroy();
        done();
      }, REQUEST_DELAY);
    });
  });

  it('emit "select" event when list item wasClicked', (done) => {
    const onSelctedSpy = jasmine.createSpy('onSelcted');

    const vm = mount(AutocompleteInput, {
      value: 'val1',
      minLettersForRequest: 1,
      getSuggestions: () => Promise.resolve(['item1', 'item2']),
    });

    vm.$on('select', onSelctedSpy);
    const input = vm.$el.querySelector('input');
    input.dispatchEvent(new Event('input'));

    Vue.nextTick(() => {
      setTimeout(() => {
        const listItems = vm.$el.querySelectorAll('li');
        listItems[0].click();
        expect(onSelctedSpy).toHaveBeenCalledWith('item1');
        vm.$destroy();
        done();
      }, REQUEST_DELAY);
    });
  });
});
