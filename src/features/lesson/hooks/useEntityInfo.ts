import { useState, useEffect } from 'react';
import useAppSearchParams from '@/hooks/useAppSearchParams';
import GroupService from '@/features/group/api/service';
import TeacherService from '@/features/teacher/api/service';
import RoomService from '@/features/room/api/service';
import { EntityState } from '../types/entity';
import { ScheduleType } from '../types/consts';

export const useEntityInfo = (): EntityState => {
  const { getParam } = useAppSearchParams();
  const [state, setState] = useState<EntityState>({
    type: 'none',
    isLoading: false,
    error: null,
    data: null,
  });

  const groupId = getParam(ScheduleType.GROUP);
  const teacherId = getParam(ScheduleType.TEACHER);
  const roomId = getParam(ScheduleType.ROOM);

  useEffect(() => {
    const fetchEntity = async () => {
      if (groupId) {
        setState({ type: 'group', isLoading: true, error: null, data: null });
        try {
          const data = await GroupService.fetchGroup(groupId);
          setState({ type: 'group', isLoading: false, error: null, data });
        } catch (error: unknown) {
          setState({
            type: 'group',
            isLoading: false,
            error: 'Ошибка загрузки группы',
            data: null,
          });
          console.log(error);
        }
      } else if (teacherId) {
        setState({ type: 'teacher', isLoading: true, error: null, data: null });
        try {
          const data = await TeacherService.fetchTeacher(teacherId);
          setState({ type: 'teacher', isLoading: false, error: null, data });
        } catch (error: unknown) {
          setState({
            type: 'teacher',
            isLoading: false,
            error: 'Ошибка загрузки преподавателя',
            data: null,
          });
          console.log(error);
        }
      } else if (roomId) {
        setState({ type: 'room', isLoading: true, error: null, data: null });
        try {
          const data = await RoomService.fetchRoom(roomId);
          setState({ type: 'room', isLoading: false, error: null, data });
        } catch (error: unknown) {
          setState({
            type: 'room',
            isLoading: false,
            error: 'Ошибка загрузки аудитории',
            data: null,
          });
          console.log(error);
        }
      } else {
        setState({ type: 'none', isLoading: false, error: null, data: null });
      }
    };

    fetchEntity();
  }, [groupId, teacherId, roomId]);

  return state;
};
