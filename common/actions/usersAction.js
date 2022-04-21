import {
    Environment,
    resolveResponse,
    resolveRejected,
} from 'common';

import {
    Api
} from 'common/actions';

import {
    DataStore
} from 'common/dataStore';

export const getUser = async(id, token) => {
    const url = `https://munchies-api-5fqmkwna4q-nw.a.run.app/users/${id}`;

    try { 
        const response = await Api.get(url, token);
        return response;
        //   return resolveResponse(response);
    } catch (ex) {
        let ret = resolveRejected(ex);
        if (ex && ex.response && ex.response.status === 401) {
            ret.message = 'Something went wrong';
        };
        return ex;
    };
};

export const updateUser = async(id, data, token) => {
    const url = `https://munchies-api-5fqmkwna4q-nw.a.run.app/users/${id}`;
    try { 
        const response = await Api.put(url, data, token);
        return response;
        //   return resolveResponse(response);
    } catch (ex) {
        let ret = resolveRejected(ex);
        if (ex && ex.response && ex.response.status === 401) {
            ret.message = 'Something went wrong';
        };
        return ex;
    };
};