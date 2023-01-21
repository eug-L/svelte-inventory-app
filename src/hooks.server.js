import PocketBase from 'pocketbase';
import {PB_IP} from '$env/static/private';
import {serializeNonPOJOs} from '$lib/utils';
import { base } from "$app/paths";
import { redirect } from '@sveltejs/kit';

/** @type {import('@sveltejs/kit').Handle} */
export const handle = async ({ event, resolve }) => {
	event.locals.pb = new PocketBase(PB_IP);
	event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

	if (event.locals.pb.authStore.isValid) {
		event.locals.user = serializeNonPOJOs(event.locals.pb.authStore.model);
	} else {
		event.locals.user = undefined;
	}

	if (isAuthRoute(event.url.pathname)) {
		if (!event.locals.user) {
			throw redirect(303, base);
		}
	}

	const response = await resolve(event);

	response.headers.set('set-cookie', event.locals.pb.authStore.exportToCookie());

	return response;
}

const authRoutes = [
	`${base}/items`,
	`${base}/profile`,
];

function isAuthRoute(path) {
	for (let route of authRoutes) {
		if (path.startsWith(route)) {
			return true
		}
	}

	return false
}
