import { AxiosRequestConfig, CanceledError } from "axios";
import { useState, useEffect } from "react";
import apiClient from "../services/api-client";
import { useQuery } from "@tanstack/react-query";



export interface FetchResponse<T> {
  count: number;
  results: T[]
}


const useData = <T>(endpoint: string, requestConfig?: AxiosRequestConfig, deps?: any[]) => {
const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<T[]>([]);
  const [error, setError] = useState('');
  // useQuery({
  //   queryKey: ['game'],
  //   queryFn: () => 
  // })


  useEffect(() => {
      const controller = new AbortController();

    setIsLoading(true);
    apiClient
    .get<FetchResponse<T>>(endpoint, {signal: controller.signal, ...requestConfig})
    .then((response) => {
      setData(response.data.results);
      setIsLoading(false);
    })
    .catch((error) => {
      if(error instanceof CanceledError) return;
      setError(error.message)
    setIsLoading(false);
    });

    return () => controller.abort();
  }, deps ? [...deps] : []);

  return { data, error, isLoading };
}

export default useData