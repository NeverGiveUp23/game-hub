import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/api-client";
import { fullDay } from "./useGenres";
import platforms from "../data/platforms";



const api = new apiClient<Platform>("/platforms/lists/parents");

export interface Platform {
id: number;
name: string;
slug: string;
}

const usePlatforms = () =>
  useQuery({
    queryKey: ["platforms"],
    queryFn: api.getAll,
    staleTime: fullDay,
    initialData: platforms
  });

export default usePlatforms