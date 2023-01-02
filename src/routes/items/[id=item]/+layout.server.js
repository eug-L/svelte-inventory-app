import { items } from '$lib/server/data';
import { serializeNonPOJOs } from '$lib/utils';

/** @type {import('./$types').PageLoad} */
export const load = async ({ locals, params }) => {
  const { pb } = locals;
  let item = await pb.collection('items').getOne(params.id).catch(err => {
    console.log(err);
  });

  item = serializeNonPOJOs(item);

  if (item.image) {
    const url = pb.getFileUrl(item, item.image)
    item = {
      ...item,
      image: url,
    }
  }

  return {
    item,
  };
}
