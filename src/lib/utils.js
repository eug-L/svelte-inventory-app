import {PB_IP} from '$env/static/private';

export const serializeNonPOJOs = (obj) => {
	return JSON.parse(JSON.stringify(obj));
}

export const getFileUrl = (collection, id, filename) => {
	const domain = process.env.NODE_ENV === 'production' ? 'https://home-inv.chickenugget.com' : PB_IP

	const url = `${domain}/api/files/${collection}/${id}/${filename}`

	return url;
}
