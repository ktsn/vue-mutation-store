export type State = { [key: string]: any };
export type Getter = (state: State) => any;
export type Mutation = (state: State, ...args: any[]) => void;
export type GetterMap = { [key: string]: Getter };
export type MutationMap = { [key: string]: Mutation };
