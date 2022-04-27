export class Api {
  constructor () {

  }

  static setHeaders = (headers, token) => {
    if (token) {
      headers['authorization'] = `Bearer ${token}`;
      headers['Access-Control-Allow-Methods']='GET, POST, PATCH, PUT, DELETE, OPTIONS';
      headers['credentials'] = 'include';
    };
    
    headers['Content-Type'] = 'application/json';

    return headers;
  };

  static sendRequest = async(url, params, token) => {
    const headers = this.setHeaders({}, token);

    const data = params.body;
    delete params.body;

    const response = await fetch(url, {
      headers: {...headers},
      body: JSON.stringify(data),
      ...params
    })
    .then(response => response.json())
    .catch(err => {
        console.log("Request Error: " + err);
    });

    return response;
  };

  static get = (url, token) => {
    return this.sendRequest(url, {
      method: 'GET',
    }, token);
  };

  static post = (url, data, token) => {
    return this.sendRequest(url, {
      method: 'POST',
      body: data,
    }, token);
  };

  static put = (url, data, token) => {
    return this.sendRequest(url, {
      method: 'PUT',
      body: data,
    }, token);
  };

  static delete = (url, token) => {
    return this.sendRequest(url, {
      method: 'DELETE',
      body: {}
    }, token);
  };
};