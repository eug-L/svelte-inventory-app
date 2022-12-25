/** @type {import('./$types').PageLoad} */
export const load = ({ params }) => {
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
