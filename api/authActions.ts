import { apiEndpoint } from 'common/constants';
import { Api } from './Api';
import { resolveResponse, resolveRejected } from './apiUtils';

export const login = async (email: String, password: String, token: String) => {
  try {
    if (!email) {
      return {
        ok: false,
        message: 'Please provide a valid email',
        data: null,
      };
    }

    if (!password) {
      return {
        ok: false,
        message: 'Please provide a valid password',
        data: null,
      };
    }

    const ret = await Api.post(apiEndpoint, { email, password }, token);

    return resolveResponse(ret);
  } catch (ex: any) {
    const ret = resolveRejected(ex);
    if (ex && ex.response && ex.response.status === 401) {
      ret.message = 'Invalid username or password';
    }
    return ret;
  }
};
