import axios from "axios";

export default class JAX {
  constructor(root, endpoint_config) {
    if (typeof root !== "string")
      throw new TypeError(`JAX#constructor: ${typeof root} must be a string!`);

    this.root = root;

    for (let endpoint in endpoint_config) {
      //...
    }
  }

  static delegate_error(res) {
    if (res instanceof Error) throw res;
    else return res.data;
  }

  get(endpoint, params) {
    return axios
      .get(`${this.root}/${endpoint}`, { params })
      .then((res) => res.data)
      .catch(delegate_error);
  }

  post(endpoint, body) {
    return axios
      .post(`${this.root}/${endpoint}`, body)
      .then((res) => res.data)
      .catch(delegate_error);
  }

  put(endpoint, body) {
    return axios
      .put(`${this.root}/${endpoint}`, body)
      .then((res) => res.data)
      .catch(delegate_error);
  }

  delete(endpoint, params) {
    return axios
      .put(`${this.root}/${endpoint}`, { params })
      .then((res) => res.data)
      .catch(delegate_error);
  }
}
