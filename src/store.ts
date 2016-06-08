import { Mutation, AsyncMutation } from './mutation';

export default class Store<T> {
  private vm: vuejs.Vue;

  constructor(initialState: T) {
    this.vm = new Vue({
      data: initialState
    });

    const dispatch = this.dispatch;
    this.dispatch = f => {
      dispatch.call(this, f);
    };
  }

  get state() : T {
    return this.vm.$data;
  }

  dispatch(f: Mutation<T> | AsyncMutation<T>) {
    const p = f(this.state);
    if (!p) return;

    p.then(g => {
      if (g) this.dispatch(g);
    });
  }
}
