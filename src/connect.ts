import * as Vue from 'vue';
import { State } from './store';
import { camelToKebab, mapValues } from './utils';

export type Getter = (state: State) => any;
export type Mutation = (state: State, ...args: any[]) => void;
export type GetterMap = { [key: string]: Getter };
export type MutationMap = { [key: string]: Mutation };

export function connect(getters: GetterMap, mutations: MutationMap) {
  return function(name: string, Component: vuejs.VueStatic) : vuejs.VueStatic {
    const Container = Vue.extend({
      computed: mapGettersToComputed(getters),
      methods: mapMutationsToMethods(mutations),
      components: {
        [name]: Component
      }
    });

    const _init = Container.prototype._init;
    Container.prototype._init = function(options: vuejs.ComponentOption) {
      const getterKeys = Object.keys(getters);
      const mutationKeys = Object.keys(mutations);

      const props = getterKeys.concat(mutationKeys).map(bindProp);
      options.template = `<${name} ${props.join(' ')}></${name}>`;

      _init.call(this, options);
    };

    return Container;
  };
}

function mapGettersToComputed(getters: GetterMap) : { [key: string]: Function } {
  return mapValues(getters, (getter: Getter, key: string) => {
    return function() {
      return getter(this.$store.state);
    };
  });
}

function mapMutationsToMethods(mutations: MutationMap) : { [key: string]: Function } {
  return mapValues(mutations, (mutation: Mutation, key: string) => {
    return function(...args: any[]) {
      return mutation(this.$store.state, ...args);
    };
  });
}

function bindProp(key: string) : string {
  return `:${camelToKebab(key)}=${key}`;
}
