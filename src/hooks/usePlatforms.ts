import { useQuery } from "@tanstack/react-query";
import useData, { FetchResponse } from "./useData";
import apiClient from "../services/api-client";
import { fullDay } from "./useGenres";
import genres from "../data/genres";
import platforms from "../data/platforms";

interface Platform {
id: number;
name: string;
slug: string;
}

const usePlatforms = () =>
  useQuery({
    queryKey: ["platforms"],
    queryFn: () =>
      apiClient
        .get<FetchResponse<Platform>>("/platforms/lists/parents")
        .then((res) => res.data),
    staleTime: fullDay,
    initialData: {count: platforms.length, results: platforms}
  });

export default usePlatforms