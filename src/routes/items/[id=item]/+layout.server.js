import { items } from '$lib/server/data';
import { serializeNonPOJOs, getFileUrl } from '$lib/utils';

/** @type {import('./$types').PageLoad} */
export const load = async ({ locals, params }) => {
  const { pb } = locals;
  let item = await pb.collection('items').getOne(params.id).catch(err => {
    console.log(err);
  });

  item = serializeNonPOJOs(item);

  if (item.image) {
    const url = getFileUrl(item.collectionId, item.id, item.image);
    item = {
      ...item,
      image: url,
    }
  }

  return {
    item,
  };
}
