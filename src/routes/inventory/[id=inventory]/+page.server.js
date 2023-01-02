import { items, inventories } from '$lib/server/data';

/** @type {import('./$types').PageLoad} */
export function load({ params }) {
  let foundInventory = inventories.find(inventory => inventory.id === params.id)
  let inventoryItems = items.filter(item => item.inventory_id === params.id)

  return {
    foundInventory,
    inventoryItems,
  };
}
