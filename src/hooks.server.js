import PocketBase from 'pocketbase';

/** @type {import('@sveltejs/kit').Handle} */
export const handle = async ({ event, resolve }) => {
	event.locals.pb = new PocketBase('http://192.168.0.17:8090');
	event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

	// if (event.locals.pb.authStore.isValid) {
	// 	event.locals.user =
	// }

	const response = await resolve(event);

	response.headers.set('set-cookie', event.locals.pb.authStore.exportToCookie());

	return response;
}
