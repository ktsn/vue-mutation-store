export function mapG<S, T, R>(
  a: (s: S) => T,
  r: (t: T) => R
) : (s: S) => R {
  return s => r(a(s));
}

export function mapG2<S, T, U, R>(
  a: (s: S) => T,
  b: (s: S) => U,
  r: (t: T, u: U) => R
) : (s: S) => R {
  return s => r(a(s), b(s));
}

export function mapG3<S, T, U, V, R>(
  a: (s: S) => T,
  b: (s: S) => U,
  c: (s: S) => V,
  r: (t: T, u: U, v: V) => R
) : (s: S) => R {
  return s => r(a(s), b(s), c(s));
}

export function mapG4<S, T, U, V, W, R>(
  a: (s: S) => T,
  b: (s: S) => U,
  c: (s: S) => V,
  d: (s: S) => W,
  r: (t: T, u: U, v: V, w: W) => R
) : (s: S) => R {
  return s => r(a(s), b(s), c(s), d(s));
}

export function mapG5<S, T, U, V, W, X, R>(
  a: (s: S) => T,
  b: (s: S) => U,
  c: (s: S) => V,
  d: (s: S) => W,
  e: (s: S) => X,
  r: (t: T, u: U, v: V, w: W, x: X) => R
) : (s: S) => R {
  return s => r(a(s), b(s), c(s), d(s), e(s));
}
