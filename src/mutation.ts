import { Promise } from 'es6-promise';
import { State } from './store';

export type Mutation      = (state: State) => void;
export type AsyncMutation = (state: State) => Promise<Mutation>;

export const mzero: Mutation      = state => {};
export const azero: AsyncMutation = state => Promise.resolve(mzero);

export function seqM(...ms: Mutation[]) : Mutation {
  return state => ms.forEach(m => m(state));
}

export function seqA(...as: AsyncMutation[]) : AsyncMutation {
  if (typeof as[0] !== 'function') return azero;

  return state =>
    as[0](state)
      .then(m => (m || mzero)(state))
      .then(_ => seqA(...as.slice(1))(state));
}

export function liftM(m: Mutation) : AsyncMutation {
  return state => Promise.resolve(m);
}

export function mutation(f: (state: State) => void) : Mutation {
  return f;
}

export function asyncMutation(f: (state: State) => Promise<Mutation>) : AsyncMutation {
  return state => f(state) || Promise.resolve(mzero);
}
