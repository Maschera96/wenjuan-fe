type axiosConfigType = {
  baseURL?: string;
  timeout?: number;
};
const config = {} as axiosConfigType;
if (process.env.NODE_ENV === "development") {
  config.timeout = 10 * 1000;
}
// if (process.env.NODE_ENV === "production") {
//   config.baseURL = "http://118.178.252.30:3001";
// }
export const AXIOS_INSTANCE_CONFIG = config;
