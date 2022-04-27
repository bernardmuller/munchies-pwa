import {
    resolveRejected,
    API_endpoint
} from 'common';

import {
    Api
} from 'common/actions';

export const updateIngredient = async(id, data, token) => {
    const url = `${API_endpoint}ingredients/${id}`;
  
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

// export const getMeals = async() => {
//     const url = `https://munchies-api-5fqmkwna4q-nw.a.run.app/meals`;
    
//     try {
//         const response = await Api.get(url);
//         // return resolveResponse(response);
//         return response
//     } catch (ex) {
//         let ret = resolveRejected(ex);
//         if (ex && ex.response && ex.response.status === 401) {
//             ret.message = 'Something went wrong';
//         };
//         return ret;
//     };
// };

export const getIngredients = async(token) => {
    const url = `${API_endpoint}ingredients`;
    
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
