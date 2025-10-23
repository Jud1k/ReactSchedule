import { queryOptions, useQuery } from '@tanstack/react-query';
import RoomService from './service';
import { QueryConfig } from '@/lib/react-query';

export const getRoomQueryOptions = (roomId: number) => {
  return queryOptions({
    queryKey: ['rooms', roomId],
    queryFn: () => RoomService.fetchRoom(roomId),
  });
};

type useRoomOptions = {
  roomId: number;
  queryConfig?: QueryConfig<typeof getRoomQueryOptions>;
};

export const useRoom = ({ roomId, queryConfig }: useRoomOptions) => {
  return useQuery({ ...getRoomQueryOptions(roomId), ...queryConfig });
};
