import { State } from './store';
import { camelToKebab, mapValues } from './utils';
import { Mutation } from './mutation';

export type Getter    = (state: State) => any;
export type Action    = (...args: any[]) => Mutation;
export type GetterMap = { [key: string]: Getter };
export type ActionMap = { [key: string]: Action };

export default function connect(getters: GetterMap, actions: ActionMap) {
  return (name: string, Component: vuejs.VueStatic) : vuejs.VueStatic => {
    const getterKeys = Object.keys(getters);
    const actionKeys = Object.keys(actions);

    const props = getterKeys.concat(actionKeys).map(bindProp);

    return Vue.extend({
      template: `<${name} ${props.join(' ')}></${name}>`,
      computed: mapGettersToComputed(getters),
      methods: mapMutationsToMethods(actions),
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

function mapMutationsToMethods(actions: ActionMap) : { [key: string]: Function } {
  return mapValues(actions, (action: Action, key: string) => {
    return function(...args: any[]) {
      return this.$store.dispatch(action(...args));
    };
  });
}

function bindProp(key: string) : string {
  return `:${camelToKebab(key)}=${key}`;
}
