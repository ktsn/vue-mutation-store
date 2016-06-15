import { Mutation, AsyncMutation, cmapM, cmapA } from './mutation';

export function actionM<T, U>(
  action: (...args: any[]) => Mutation<T>,
  f: (u: U) => T
) : (...args: any[]) => Mutation<U> {
  return (...args) => cmapM(action(...args), f);
}

export function actionA<T, U>(
  action: (...args: any[]) => AsyncMutation<T>,
  f: (u: U) => T
) : (...args: any[]) => AsyncMutation<U> {
  return (...args) => cmapA(action(...args), f);
}
