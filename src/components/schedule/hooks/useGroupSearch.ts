import { useQuery } from "@tanstack/react-query";
import api from "@/api/axiosConfig";

interface Group {
  id: number;
  name: string;
}

export default function useGroupSearch(endpoint: string, searchTerm?: string) {
  return useQuery<Group[], Error>({
    queryKey: ["groups", searchTerm],
    queryFn: async ({ signal }) => {
      if (!searchTerm) return [];
      const response = await api.get(`${endpoint}?query=${searchTerm}`, {
        signal,
      });
      return response.data;
    },
    enabled: !!searchTerm,
    staleTime: 1000 * 60 * 5,
  });
}
