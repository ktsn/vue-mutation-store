import { State } from './store';

export class Mutation {
  constructor(public run: (state: State) => void) {}

  then(m: Mutation) : Mutation {
    return new Mutation(state => {
      this.run(state);
      m.run(state);
    });
  }
}

export default function mutation(run: (state: State) => void) : Mutation {
  return new Mutation(run);
}
