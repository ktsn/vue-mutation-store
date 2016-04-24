interface Store {
  state: { [key: string]: any };
}

declare interface Window {
  Vue?: vuejs.VueStatic;
}

declare namespace vuejs {
  interface Vue {
    $store?: Store;
  }

  interface ComponentOption {
    store?: Store;
  }
}
