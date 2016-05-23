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

  dispatch(mutation: (state: State) => void) {
    mutation(this.state);
  }
}
