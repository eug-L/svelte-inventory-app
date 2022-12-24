/** @type {import('./$types').PageLoad} */
export function load({ params }) {
  // fetch available inventories
  const inventories = [
    {
      id: '1',
      name: 'First Inv',
      value: 'First Inv',
    },
    {
      id: '2',
      name: 'Second Inv',
      value: 'Second Inv',
    }
  ]
  return {
    id: params.id,
    inventories,
  };
}

/** @type {import('./$types').Actions} */
export const actions = {
  default: async (event) => {
    console.log(event);
  }
};
