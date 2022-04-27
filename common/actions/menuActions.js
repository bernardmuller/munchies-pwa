import {
    Environment,
    resolveResponse,
    resolveRejected,
    API_endpoint
} from 'common';

import {
    Api
} from 'common/actions';

import {
    DataStore
} from 'common/dataStore';

export const createMenu = async(token) => {
    const url = `https://munchies-api-5fqmkwna4q-nw.a.run.app/menus`;

    try { 
        const response = await Api.post(url, {} , token);
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

export const updateMenu = async(id, data) => {
    const url = `https://munchies-api-5fqmkwna4q-nw.a.run.app/menus/${id}`;
    console.log(data)
    try { 
        const response = await Api.put(url, data);
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
  
export const getMenus = async(token) => {
    const url = `${API_endpoint}menus`;
    
    try {
        const response = await Api.get(url, token);
        // return resolveResponse(response);
        return response
    } catch (ex) {
        let ret = resolveRejected(ex);
        if (ex && ex.response && ex.response.status === 401) {
            ret.message = 'Something went wrong';
        };
        return ret;
    };
};

export const getMenu = async(id, token) => {
    const url = `${API_endpoint}menus/${id}`;
    
    try {
        const response = await Api.get(url, token);
        // return resolveResponse(response);
        return response
    } catch (ex) {
        let ret = resolveRejected(ex);
        if (ex && ex.response && ex.response.status === 401) {
            ret.message = 'Something went wrong';
        };
        return ret;
    };
};

export const deleteMenu = async(id, token) => {
    const url = `${API_endpoint}menus/${id}`;
    
    try {
        const response = await Api.delete(url, token);
        // return resolveResponse(response);
        return response
    } catch (ex) {
        let ret = resolveRejected(ex);
        if (ex && ex.response && ex.response.status === 401) {
            ret.message = 'Something went wrong';
        };
        return ret;
    };
};


export const addMealsToMenu = async(id, data, token) => {
    const url = `${API_endpoint}menus/${id}/meals`;
    
    try {
        const response = await Api.post(url, data, token);
        // return resolveResponse(response);
        return response
    } catch (ex) {
        let ret = resolveRejected(ex);
        if (ex && ex.response && ex.response.status === 401) {
            ret.message = 'Something went wrong';
        };
        return ret;
    };
};

