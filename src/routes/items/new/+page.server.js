// import { items } from "$lib/stores";

const items = [{
  id: '1',
  inventory_id: '1',
  name: 'first item'
}]

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
    items,
  };
}

/** @type {import('./$types').Actions} */
export const actions = {
  default: async ({ request }) => {
    const formData = await request.formData();

    const barcode = formData.get('barcode');
    const name = formData.get('name');
    const expiry_date = formData.get('expiry_date');
    const image = formData.get('image');
    const inventory = formData.get('inventory');

    const item = {
      barcode,
      name,
      expiry_date,
      image,
      inventory,
    };

    // items.update(i => [...i, item]);
    items.push(item);
  }
};
