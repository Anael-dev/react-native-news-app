import axios from "axios";

import { getUserCradentials } from "../../utils";

const OrgApi = axios.create();

OrgApi.interceptors.request.use(
  async (config) => {
    const cradentials = await getUserCradentials();
    config.headers = {};
    if (cradentials) {
      config.headers.Authorization = "Bearer " + cradentials?.token;
      config.baseURL = cradentials?.baseUrl || undefined;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default OrgApi;
