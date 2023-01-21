import { base } from "$app/paths";
import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').Actions} */
export const actions = {
  logout: ({ request, locals }) => {
    locals.pb.authStore.clear();
    locals.user = undefined;

    throw redirect(303, base);
  },
};
