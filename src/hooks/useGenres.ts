import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/api-client";
import genres from "../data/genres";

const api = new apiClient<Genre>("/genre");


export interface Genre {
  id: number;
  name: string;
  image_background: string;
}

export const fullDay: number = 24 * 60 * 60 * 1000; // 24h

const useGenres = () => useQuery({
  queryKey: ['genres'],
  queryFn: api.getAll,
  staleTime: fullDay,
  initialData: genres
})
export default useGenres