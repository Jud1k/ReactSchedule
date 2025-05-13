import { useQuery } from "@tanstack/react-query";
import api from "@/api/axiosConfig";


export default function useSearch(endpoint: string, searchTerm?: string) {
  return useQuery({
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
