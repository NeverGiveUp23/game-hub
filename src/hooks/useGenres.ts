import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/api-client";
import { FetchResponse } from "./useData";
import genres from "../data/genres";
export interface Genre {
  id: number;
  name: string;
  image_background: string;
}

export const fullDay: number = 24 * 60 * 60 * 1000; // 24h

const useGenres = () => useQuery({
  queryKey: ['genres'],
  queryFn: () => apiClient
  .get<FetchResponse<Genre>>('/genres').then(res => res.data),
  staleTime: fullDay,
  initialData: {count: genres.length, results: genres}
})
export default useGenres