import { message } from "antd";
import axios from "axios";
import { getToken } from "../utils/user-token";
import { AXIOS_INSTANCE_CONFIG } from "../config";

const instance = axios.create(AXIOS_INSTANCE_CONFIG);

// request 拦截：每次请求都带上 token
instance.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] = `Bearer ${getToken()}`;
    return config;
  },
  (error) => Promise.reject(error),
);

// response 拦截
instance.interceptors.response.use((res) => {
  const resData = (res.data || {}) as ResType;
  const { errno, data = {}, msg } = resData;

  if (errno !== 0) {
    if (msg) {
      message.error(msg);
    }

    throw new Error(msg);
  }

  return data as any;
});

export default instance;

export type ResType = {
  errno: number;
  data?: ResDataType;
  msg?: string;
};

export type ResDataType = {
  [key: string]: any;
};
