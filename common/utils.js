export async function resolveResponse(res) {
	if (!res) {
		return {
			ok: false,
			message: "Invalid response",
			data: null,
		};
	}

	let ok = res.status >= 200 && res.status < 300;

	let response = await res.json();
	console.log(response)
	return {
		ok: ok,
		message: response.message && response.message,
		data: response,
	};
}

export function resolveRejected(res) {
	let err;

	if (res.response && res.response.data && res.response.data.message) {
		err = res.response.data.message;
	}
	console.log(res)
	return {
		ok: false,
		message: err || "Unfortunately a technical error occurred",
		data: res.response && res.response.data,
	};
}
