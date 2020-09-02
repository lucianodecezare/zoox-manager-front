import Vue from 'vue';
import axios from 'axios';

import { Constants } from '../utils/constants';

const axiosInstance = axios.create({
  baseURL: Constants.URL_API,
});

Vue.prototype.$axios = axiosInstance;

export { axiosInstance };
