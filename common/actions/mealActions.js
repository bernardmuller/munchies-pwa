import { Environment, resolveResponse, resolveRejected, API_endpoint} from "common";
import { Api } from "common/actions";

export const createMeal = async (token) => {
	const url = `${API_endpoint}meals`;
	try {
		const response = await Api.post(url, {}, token);
		return response;
	} catch (ex) {
		let ret = resolveRejected(ex);
		if (ex && ex.response && ex.response.status === 401) {
			ret.message = "Something went wrong";
		}
		return ex;
	}
};

export const updateMeal = async (id, data, token) => {
	const url = `${API_endpoint}meals/${id}`;
	try {
		const response = await Api.put(url, data, token);
		return response;
	} catch (ex) {
		let ret = resolveRejected(ex);
		if (ex && ex.response && ex.response.status === 401) {
			ret.message = "Something went wrong";
		}
		return ex;
	}
};

export const getMeals = async (token) => {
	const url = `${API_endpoint}meals`;

	try {
		const response = await Api.get(url, token);
		// return resolveResponse(response);
		return response;
	} catch (ex) {
		console.log(ex);
		let ret = resolveRejected(ex);
		if (ex && ex.response && ex.response.status === 401) {
			ret.message = "Something went wrong";
		}
		return ret;
	}
};

export const getMeal = async (id, token) => {
	const url = `${API_endpoint}meals/${id}`;
	try {
		const response = await Api.get(url, token);
		// return resolveResponse(response);
		return response;
	} catch (ex) {
		let ret = resolveRejected(ex);
		if (ex && ex.response && ex.response.status === 401) {
			ret.message = "Something went wrong";
		}
		return ret;
	}
};

export const removeIngredient = async (id, ingredient_id, token) => {
	const url = `${API_endpoint}meals/${id}/remove`;

	try {
		const response = await Api.post(
			url,
			{ ingredient_id: ingredient_id },
			token
		);
		return response;
	} catch (ex) {
		let ret = resolveRejected(ex);
		if (ex && ex.response && ex.response.status === 401) {
			ret.message = "Something went wrong";
		}
		return ex;
	}
};

export const addIngredient = async (id, ingredient_id, token) => {
	const url = `${API_endpoint}meals/${id}/add`;

	try {
		const response = await Api.post(
			url,
			{ ingredient_id: ingredient_id },
			token
		);
		return response;
	} catch (ex) {
		let ret = resolveRejected(ex);
		if (ex && ex.response && ex.response.status === 401) {
			ret.message = "Something went wrong";
		}
		return ex;
	}
};

export const deleteMeal = async (id, token) => {
	const url = `${API_endpoint}meals/${id}`;

	try {
		const response = await Api.delete(url, token);
		return response;
	} catch (ex) {
		let ret = resolveRejected(ex);
		if (ex && ex.response && ex.response.status === 401) {
			ret.message = "Something went wrong";
		}
		return ex;
	}
};
