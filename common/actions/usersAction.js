import {
    resolveRejected,
    API_endpoint
} from 'common';

import {
    Api
} from 'common/actions';

export const getUser = async(id, token) => {
    const url = `${API_endpoint}users/${id}`;

    try { 
        const response = await Api.get(url, token);
        return response;

    } catch (ex) {
        let ret = resolveRejected(ex);
        if (ex && ex.response && ex.response.status === 401) {
            ret.message = 'Something went wrong';
        };
        return ex;
    };
};

export const updateUser = async(id, data, token) => {
    const url = `${API_endpoint}users/${id}`;
    try { 
        const response = await Api.put(url, data, token);
        return response;

    } catch (ex) {
        let ret = resolveRejected(ex);
        if (ex && ex.response && ex.response.status === 401) {
            ret.message = 'Something went wrong';
        };
        return ex;
    };
};