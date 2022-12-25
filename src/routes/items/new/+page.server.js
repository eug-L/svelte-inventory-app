import { z } from "zod";

const itemSchema = z.object({
  barcode: z
    .string({ required_error: "Barcode is required" })
    .min(3, "Invalid barcode")
    .trim(),
  name: z
    .string()
    .min(1, "Name is required")
    .max(64, "Name must be less than 64 characters")
    .trim(),
  expiry_date: z.preprocess((arg) => {
    if (typeof arg == "string" && arg.length === 0) return;
    if (typeof arg == "string" || arg instanceof Date) return new Date(arg);
  }, z.date({ required_error: "Expiry date is required" })),
  image: z.any().refine((blob) => blob?.size > 0, "Image is required"),
  inventory: z.string().min(1, "Inventory is required"),
});

const items = [
  {
    id: "1",
    inventory_id: "1",
    name: "first item",
  },
];

/** @type {import('./$types').PageLoad} */
export const load = async ({ params }) => {
  // fetch available inventories
  const inventories = [
    {
      id: "1",
      name: "First Inv",
      value: "First Inv",
    },
    {
      id: "2",
      name: "Second Inv",
      value: "Second Inv",
    },
  ];

  return {
    id: params.id,
    inventories,
    items,
  };
};

/** @type {import('./$types').Actions} */
export const actions = {
  default: async ({ request }) => {
    const formData = await request.formData();
    const item = Object.fromEntries(formData);
    console.log(item);
    // return
    try {
      const result = itemSchema.parse(item);
      console.log("success");
      console.log(result);

      // // @ts-ignore
      // items.push(item);
    } catch (err) {
      // @ts-ignore
      const { fieldErrors: errors } = err.flatten();
      const { image, ...rest } = item;

      return {
        data: rest,
        errors
      };
    }
  },
};
