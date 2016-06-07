import { Mutation, AsyncMutation } from './mutation';

export type State = any;

export default class Store {
  private vm: vuejs.Vue;

  constructor(initialState: State) {
    this.vm = new Vue({
      data: initialState
    });

    const dispatch = this.dispatch;
    this.dispatch = f => {
      dispatch.call(this, f);
    };
  }

  get state() : State {
    return this.vm.$data;
  }

  dispatch(f: Mutation) : void;
  dispatch(f: AsyncMutation) : void {
    const p = f(this.state);
    if (!p) return;

    p.then(g => {
      if (g) this.dispatch(g);
    });
  }
}
