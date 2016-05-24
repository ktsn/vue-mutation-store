interface Window {
  Vue?: vuejs.VueStatic;
}

declare namespace vuejs {
  interface Vue {
    $store?: Object;
  }

  interface ComponentOption {
    store?: Object;
  }
}
