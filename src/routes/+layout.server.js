const items = [{
  id: '1',
  inventory_id: '1',
  name: 'first item from layout'
}]

/** @type {import('./$types').LayoutLoad} */
export const load = () => {
  return {
    items
  }
}
