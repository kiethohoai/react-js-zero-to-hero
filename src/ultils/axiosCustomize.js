import axios from "axios";
// import NProgress from "./../../node_modules/nprogress/nprogress";
import NProgress from "nprogress";

NProgress.configure({
  showSpinner: false,
  trickleSpeed: 50,
});

const instance = axios.create({
  baseURL: "http://localhost:8081/",
});

// Add a request interceptor
instance.interceptors.request.use(

  function (config) {
    // Do something before request is sent
    NProgress.start();
    return config;
  },
  function (error) {
    // Do something with request error
    NProgress.start();
    return Promise.reject(error);
  },
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    NProgress.done();
    return response && response.data ? response.data : response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    NProgress.done();
    return error && error.response && error.response.data
      ? error.response.data
      : Promise.reject(error);
  },
);

export default instance;
