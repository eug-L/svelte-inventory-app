import { writable } from "svelte/store";

export default writable([
  {
    id: '1',
    name: 'First Inv',
    owner: 'admin',
    invited: [],
    items: [
      {
        id: '1',
        name: 'first item'
      },
    ]
  },
  {
    id: '2',
    name: 'Second Inv',
    owner: 'admin',
    invited: [],
    items: []
  }
]);
