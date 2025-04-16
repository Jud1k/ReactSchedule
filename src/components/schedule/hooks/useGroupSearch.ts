import { useEffect, useState } from "react";
import api from "../../../api/axiosConfig";

interface Groups {
  id: number;
  name: string;
}

export default function useGroupSearch(debouncedSearchTerm: string) {
  const [groups, setGroups] = useState<Groups[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!debouncedSearchTerm) {
      setGroups([]);
      return;
    }
    setIsLoading(true);
    const SearchGroups = async () => {
      await api
        .get(`/group/search?query=${debouncedSearchTerm}`)
        .then((res) => setGroups(res.data))
        .catch((err) => setError(err.message))
        .finally(() => setIsLoading(false));
    };
    SearchGroups();
  }, [debouncedSearchTerm]);

  return { groups, isLoading, error };
}
