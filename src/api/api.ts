import axios from 'axios';

import { baseURL } from '../constants/apiUrls';

const api = axios.create({
  baseURL: baseURL,
});

export default api;
