import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const OrgApi = axios.create();

OrgApi.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("access_token");
    const url = await AsyncStorage.getItem("instance_url");
    config.headers = {};

    if (token) {
      config.headers.Authorization = "Bearer " + token;
    }
    if (url) {
      config.baseURL = url;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default OrgApi;
