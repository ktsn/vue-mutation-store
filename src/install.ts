import { noop } from './utils';

export function install(Vue: vuejs.VueStatic) : void {
  const _init = Vue.prototype._init;
  Vue.prototype._init = function(options: vuejs.ComponentOption = {}) {
    const init = options.init || noop;
    options.init = function() {
      pluginInit.call(this);
      init.call(this);
    };

    _init.call(this, options);
  };
}

function pluginInit() : void {
  const _this: vuejs.Vue = this;
  const { store } = <any>_this.$options;

  if (store) {
    _this.$store = store;
  } else if (_this.$parent && _this.$parent.$store) {
    _this.$store = _this.$parent.$store;
  }
}

if (typeof window.Vue !== 'undefined') {
  Vue.use(install);
}
