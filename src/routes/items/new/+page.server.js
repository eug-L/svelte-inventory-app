import { items, inventories } from '$lib/server/data';

/** @type {import('./$types').PageLoad} */
export const load = async ({ params }) => {
  // fetch available inventories

  return {
    id: params.id,
    inventories,
    items,
  };
};

