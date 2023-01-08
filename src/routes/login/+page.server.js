import { fail, error, redirect } from "@sveltejs/kit";
import { base } from '$app/paths';

export const load = ({ locals }) => {
  if (locals.user) {
    throw redirect(303, `${base}/items`);
  }
}

export const actions = {
  login: async ({ request, locals }) => {
    const body = Object.fromEntries(await request.formData());
    console.log(body, locals);

    try {
      await locals.pb.collection('users').authWithPassword(body.email, body.password);

      // if (!locals.pb.authStore?.model?.verified) {
	// locals.pb.authStore.clear();

	// return {
	  // error: true,
	  // message: 'You must verify your email before you can login',
	  // email: body.email,
	// }
      // }

    } catch (err) {
      if (err.status === 400) {
	return fail(400, {
	  error: true,
	  message: err.data.message,
	  email: body.email,
	})
      }

      throw error(500, 'Something went wrong');
    }

    throw redirect(303, `${base}/items`);
  }
}
