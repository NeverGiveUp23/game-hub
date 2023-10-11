import { CanceledError } from "axios";
import { useState, useEffect } from "react";
import apiClient from "../services/api-client";

interface Genre {
  id: number;
  name: string;
}

interface fetchGenresResponse {
  count: number;
  results: Genre[]
}


const useGenres = () => {
const [isLoading, setIsLoading] = useState(false);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [error, setError] = useState('');


  useEffect(() => {
      const controller = new AbortController();

    setIsLoading(true);
    apiClient
    .get<fetchGenresResponse>('/genres', {signal: controller.signal})
    .then((response) => {
      setGenres(response.data.results);
      setIsLoading(false);
    })
    .catch((error) => {
      if(error instanceof CanceledError) return;
      setError(error.message)
    setIsLoading(false);
    });

    return () => controller.abort();
  }, []);

  return { genres, error, isLoading };
}

export default useGenres