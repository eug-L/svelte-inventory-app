import { z } from "zod";
import { fail } from '@sveltejs/kit';
import { inventories } from '$lib/server/data';
import crypto from 'crypto';
import { serializeNonPOJOs, getFileUrl } from '$lib/utils';

const coerceNumber = z.coerce.number();

const itemSchema = z.object({
  barcode: z
    .string()
    .min(3, "Barcode is required")
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
  image: z.any(),
  quantity: z.coerce.number(),
});

/** @type {import('./$types').LayoutLoad} */
export const load = async ({ locals }) => {
  const { pb } = locals;
  let { items } = await pb.collection('items').getList().catch(err => {
    console.log(err);
  });

  items = items.map(item => {
    return {
      ...item,
      image: item.image ? getFileUrl(item.collectionId, item.id, item.image) : ''
    }
  })

  return {
    items: items,
    inventories
  };
}

/** @type {import('./$types').Actions} */
export const actions = {
  create: async ({ request, locals }) => {
    const formData = await request.formData();
    const item = Object.fromEntries(formData);
    let { image, ...rest } = item;
    console.log(image);

    try {
      itemSchema.parse(item);

      await locals.pb.collection('items').create(formData);

    } catch (err) {
      if (err.name === 'ZodError') {
        const { fieldErrors: errors } = err.flatten();

        return fail(400, {
          data: rest,
          errors
        });
      }

      let errors = {
        server: err.data.message
      }

      return fail(400, {
        data: rest,
        errors
      });
    }
  },
  update: async ({ request, locals }) => {
    const formData = await request.formData();
    const item = Object.fromEntries(formData);
    const { image, ...rest } = item;

    if (formData.get('image').size === 0) {
      formData.delete('image')
    }

    try {
      itemSchema.parse(item);

      await locals.pb.collection('items').update(item.id, formData).catch(console.log);
    } catch (err) {
      console.log(err);
      const { fieldErrors: errors } = err.flatten();

      return fail(400, {
        data: rest,
        errors
      });
    }
  },
  delete: async ({ request, locals }) => {
    const formData = await request.formData();

    const id = formData.get('id')

    await locals.pb.collection('items').delete(id).catch(console.log);
  },
};
