import Store from './store';
import { camelToKebab, mapValues, assign } from './utils';
import { Mutation } from './mutation';

export type Getter<T>    = (state: T) => any;
export type Action<T>    = (...args: any[]) => Mutation<T>;
export type GetterMap<T> = { [key: string]: Getter<T> };
export type ActionMap<T> = { [key: string]: Action<T> };

export interface LifecycleMap<T> {
  init?() : void;
  created?(store: Store<T>) : void;
  beforeCompile?(store: Store<T>) : void;
  compiled?(store: Store<T>) : void;
  ready?(store: Store<T>) : void;
  attached?(store: Store<T>) : void;
  detached?(store: Store<T>) : void;
  beforeDestroy?(store: Store<T>) : void;
  destroyed?(store: Store<T>) : void;
}

export default function connect<T>({
  getters = <GetterMap<T>>{},
  actions = <ActionMap<T>>{},
  lifecycle = <LifecycleMap<T>>{}
}) {
  return (name: string, Component: vuejs.VueStatic) : vuejs.VueStatic => {
    const getterKeys = Object.keys(getters);
    const actionKeys = Object.keys(actions);

    const props = getterKeys.concat(actionKeys).map(bindProp);

    const lifecycle_ = mapValues<any, any>(lifecycle, f => {
      return function() {
        f.call(this, this.$store);
      };
    });

    return Vue.extend(assign(lifecycle_, {
      template: `<${name} ${props.join(' ')}></${name}>`,
      computed: mapGettersToComputed(getters),
      methods: mapMutationsToMethods(actions),
      components: {
        [name]: Component
      }
    }));
  };
}

function mapGettersToComputed<T>(getters: GetterMap<T>) : { [key: string]: Function } {
  return mapValues(getters, (getter: Getter<T>, key: string) => {
    return function() {
      return getter(this.$store.state);
    };
  });
}

function mapMutationsToMethods<T>(actions: ActionMap<T>) : { [key: string]: Function } {
  return mapValues(actions, (action: Action<T>, key: string) => {
    return function(...args: any[]) {
      return this.$store.dispatch(action(...args));
    };
  });
}

function bindProp(key: string) : string {
  return `:${camelToKebab(key)}=${key}`;
}
