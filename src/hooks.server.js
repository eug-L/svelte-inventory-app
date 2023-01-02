import PocketBase from 'pocketbase';
import {LOCAL_PB_IP} from '$env/static/private';

/** @type {import('@sveltejs/kit').Handle} */
export const handle = async ({ event, resolve }) => {
	event.locals.pb = new PocketBase(LOCAL_PB_IP);
	event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

	// if (event.locals.pb.authStore.isValid) {
	// 	event.locals.user =
	// }

	const response = await resolve(event);

	response.headers.set('set-cookie', event.locals.pb.authStore.exportToCookie());

	return response;
}
