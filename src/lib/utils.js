import {PB_IP} from '$env/static/private';

const domain = process.env.NODE_ENV === 'production' ? 'https://home-inv.chickenugget.com' : PB_IP

export const serializeNonPOJOs = (obj) => {
	return JSON.parse(JSON.stringify(obj));
}

export const getFileUrl = (collection, id, filename) => {

	const url = `${domain}/api/files/${collection}/${id}/${filename}`

	return url;
}
