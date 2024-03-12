import axios from "axios";
import qs from "qs";
import { saveAs } from "file-saver";
import { baseUrl } from "@/config";

const axiosInstance = axios.create({
  baseURL: baseUrl.dev,
});

axiosInstance.interceptors.request.use(
  (config) => {
    config.data = qs.stringify(config.data);
    config.headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      token: sessionStorage.token,
    };

    return config;
  },
  (error) => Promise.reject(error)
);

export function downloadFileByPost(url, data, filename) {
  axiosInstance
    .post(url, data, { responseType: "blob" })
    .then((res) => saveAs(res.data, filename))
    .catch(() => null);
}
