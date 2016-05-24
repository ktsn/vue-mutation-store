import { Mutation } from './mutation';

export type State = { [key: string] : any }

export default class Store {
  private vm: vuejs.Vue;

  constructor(initialState: State) {
    this.vm = new Vue({
      data: initialState
    });
  }

  get state() : State {
    return this.vm.$data;
  }

  dispatch(mutation: Mutation) {
    mutation.run(this.state);
  }
}
