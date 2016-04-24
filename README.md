# vue-mutation-store

Vuex and Redux inspired MVVM approach for Vue.js. (experimental)

- High affinity for TypeScript
- Simple and writable
- Separate domain logic from frameworks

## Data Flow

```
Store ──> Container ─┬ Component
^              │     ├ Component
└─ Mutations <─┘     └ ...
```

## Example

### Create Store

```js
import * as Vue from 'vue';
import VueMS from 'vue-mutation-store';

Vue.use(VueMS);

// type definition for state
interface IUserState {
  id: number;
  name: string;
  loading: boolean;
}

interface IState {
  message: string;
  user: IUserState;
}

// define initial state
const initialState: IState = {
  message: 'Hello World!',
  user: {
    id: 1,
    name: '',
    loading: false
  }
};

export default new VueMS.Store(initialState);
```

### Mutations

Mutations are functions that mutate the state of the store.
They can be asynchronous and must receive state as their 1st argument.

```js
// define mutations
export function updateMessage(state: IState, message: string) {
  state.message = message;
}

// asynchronous mutation
export function fetchUser({ user }: IState, id: number) {
  user.loading = true;
  fetch(`/api/user/${id}`)
    .then(res => res.json())
    .then(data => {
      user.id = data.id;
      user.name = data.name;
      user.loading = false;
    });
}
```

### Connect store and components

```js
// components/user.ts
// define Vue component
import * as Vue from 'vue';

export default Vue.extend({
  props: {
    user: {
      type: String,
      required: true
    }
  },
  template: `
  <div>
    <p>id: {{ user.id }}</p>
    <p>name: {{ user.name }}</p>
    <p>loading: {{ user.loading }}</p>
    <button @click="fetchUser(user.id)">Reload</button>
  </div>
  `
});
```

```js
// container/user.ts
// connect component and store
import { connect } from 'vue-mutation-store';
import User from '../components/user';

import { fetchUser } '../mutations';

connect({
  user: (state: IState) => state.user;
}, {
  fetchUser: fetchUser
})('user', User);
```

## License

MIT
