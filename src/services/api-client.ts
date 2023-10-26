import axios from "axios";
import { AxiosRequestConfig } from 'axios';

const API_KEY = 'b7bbaf190c6846e09febbbdb8c275dd6'

export interface FetchResponse<T> {
  count: number;
  results: T[];
}

const axiosInstance = axios.create({
  baseURL: 'https://api.rawg.io/api',
  params: {
    key: API_KEY
  }
})


class apiClient<T> {
  endpoint: string;

  constructor(endpoint: string){
    this.endpoint = endpoint;
  }

  getAll = (config: AxiosRequestConfig) => {
    return axiosInstance
    .get<FetchResponse<T>>(this.endpoint, config)
    .then(res => res.data);
  }
}

export default apiClient;
