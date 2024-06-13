import Axios from "axios";
// import { ClientModel } from "../Models/ReduxModels/ClientDetails";
// import { Settings } from "../Models/ReduxModels/Settings";
// import { getSessionId } from "./GeneralUtils";
// import { v4 as uuidv4 } from "uuid";

class HttpClient {
  fetchHeaders() {
    let headers: any = {};
    headers = {
      tenantId: "500",
      "Accept-Language": "us",
    };
    return { headers: headers };
  }

  get(url: string, config = {}) {
    return Axios.get(url, {
      ...config,
      ...this.fetchHeaders(),
      ...{ withCredentials: true },
    });
  }

  post(url: string, data: any, config = {}) {
    return Axios.post(url, data, {
      ...config,
      ...this.fetchHeaders(),
      ...{ withCredentials: true },
    });
  }

  put(url: string, data: any, token: string = "") {
    return Axios.put(url, data, {
      ...this.fetchHeaders(),
    });
  }

  delete(url: string, config = {}) {
    return Axios.delete(url, {
      ...config,
      ...this.fetchHeaders(),
      ...{ withCredentials: true },
    });
  }
}

export default HttpClient;
