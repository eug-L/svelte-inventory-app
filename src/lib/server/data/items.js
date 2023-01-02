export let items = [
  {
    barcode: "alsdfknasldf",
    id: "1",
    inventory_id: "1",
    inventory_name: "First inv",
    name: "first item",
  },
  {
    barcode: "alsdfknasldg",
    id: "2",
    inventory_id: "1",
    inventory_name: "First inv",
    name: "second item",
    image: "https://placeimg.com/400/225/arch",
    expiry_date: "2022-10-20",
  },
];

export const setItems = (newItems) => items = newItems;
