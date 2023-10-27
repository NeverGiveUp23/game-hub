import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/api-client";
import platforms from "../data/platforms";
import ms from "ms";



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
    staleTime: ms('24h'),
    initialData: platforms
  });

export default usePlatforms