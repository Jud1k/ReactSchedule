import { useEffect, useMemo, useState } from "react";
import api from "../../../api/axiosConfig";

interface Lesson {
  time_id: number;
  subject: string;
  room: string;
  teacher: string;
  type_lesson: string;
  day_week: number;
}

export function useSchedule(groupId: string, dayWeek: number | null) {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLessons = async () => {
      await api
        .get(`/schedule/lessons/?group_id=${groupId}`)
        .then((res) => setLessons(res.data))
        .catch((err) => setError(err.message))
        .finally(() => setIsLoading(false));
    };
    fetchLessons();
  }, [groupId]);

  const filtredLessons = useMemo(() => {
    return lessons?.filter((lesson) => lesson.day_week === dayWeek) || [];
  }, [lessons, dayWeek]);

  return { lessons:filtredLessons, isLoading, error };
}
