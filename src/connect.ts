import { State } from './store';
import { camelToKebab, mapValues } from './utils';

export type Getter      = (state: State) => any;
export type Mutation    = (...args: any[]) => (state: State) => void;
export type GetterMap   = { [key: string]: Getter };
export type MutationMap = { [key: string]: Mutation };

export default function connect(getters: GetterMap, mutations: MutationMap) {
  return (name: string, Component: vuejs.VueStatic) : vuejs.VueStatic => {
    const getterKeys = Object.keys(getters);
    const mutationKeys = Object.keys(mutations);

    const props = getterKeys.concat(mutationKeys).map(bindProp);

    return Vue.extend({
      template: `<${name} ${props.join(' ')}></${name}>`,
      computed: mapGettersToComputed(getters),
      methods: mapMutationsToMethods(mutations),
      components: {
        [name]: Component
      }
    });
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
      return this.$store.dispatch(mutation(...args));
    };
  });
}

function bindProp(key: string) : string {
  return `:${camelToKebab(key)}=${key}`;
}
