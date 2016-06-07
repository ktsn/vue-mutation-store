export function camelToKebab(str: string) : string {
  return str
    .replace(/([a-z\d])([A-Z])/g, '$1-$2')
    .toLowerCase();
}

export function mapValues<T, U>(
  obj: { [key: string]: T },
  fn: (val: T, key: string) => U
) : { [key: string]: U } {
  const result: { [key: string]: U } = {};
  Object.keys(obj).forEach((key: string) => {
    result[key] = fn(obj[key], key);
  });
  return result;
}

export function noop() {};
