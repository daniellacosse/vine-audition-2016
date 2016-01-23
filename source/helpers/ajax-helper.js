import axios from "axios";

// a light wrapper for axios with a couple convenience methods

export default class JAX {
  constructor(root, config) {
    if (typeof root !== "string")
      throw new TypeError(`JAX#constructor: ${typeof root} must be a string!`);

    this.root = root;

    for (let function_name in config) {
      let endpoint = config[function_name];
      let method = function_name.match(/get|post|put|patch/);

      if (!method) continue;

      this[function_name] = (params) => this[method[0]](endpoint, params);

      this[function_name].bind(this);
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
      .catch(this.delegate_error);
  }

  post(endpoint, body) {
    return axios
      .post(`${this.root}/${endpoint}`, body)
      .then((res) => res.data)
      .catch(this.delegate_error);
  }

  put(endpoint, body) {
    return axios
      .put(`${this.root}/${endpoint}`, body)
      .then((res) => res.data)
      .catch(this.delegate_error);
  }

  delete(endpoint, params) {
    return axios
      .put(`${this.root}/${endpoint}`, { params })
      .then((res) => res.data)
      .catch(this.delegate_error);
  }
}
