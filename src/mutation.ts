import { Promise } from 'es6-promise';

export type Mutation<T>      = (val: T) => void;
export type AsyncMutation<T> = (val: T) => Promise<Mutation<T>>;

export const mzero = <T>(val: T) => {};
export const azero = <T>(val: T) => Promise.resolve(mzero);

export function seqM<T>(...ms: Mutation<T>[]) : Mutation<T> {
  return val => ms.forEach(m => m(val));
}

export function seqA<T>(...as: AsyncMutation<T>[]) : AsyncMutation<T> {
  if (typeof as[0] !== 'function') return azero;

  return val =>
    as[0](val)
      .then(m => (m || mzero)(val))
      .then(_ => seqA(...as.slice(1))(val));
}

export function liftM<T>(m: Mutation<T>) : AsyncMutation<T> {
  return val => Promise.resolve(m);
}

export function mutation<T>(f: (val: T) => void) : Mutation<T> {
  return f;
}

export function asyncMutation<T>(f: (val: T) => Promise<Mutation<T>>) : AsyncMutation<T> {
  return val => f(val) || Promise.resolve(mzero);
}
