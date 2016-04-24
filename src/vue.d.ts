interface Store {
  state: { [key: string]: any };
}

declare namespace vuejs {
  interface Vue {
    $store?: Store;
  }

  interface ComponentOption {
    store?: Store;
  }
}
