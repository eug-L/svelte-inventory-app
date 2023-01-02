export const serializeNonPOJOs = (obj) => {
	return JSON.parse(JSON.stringify(obj));
}

export const getFileUrl = (collection, id, filename) => {
	const domain = process.env.NODE_ENV === 'production' ? 'https://home-inv.chickenugget.com' : 'http://127.0.0.1:8090'

	const url = `${domain}/api/files/${collection}/${id}/${filename}`

	return url;
}
