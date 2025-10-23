import { queryOptions, useQuery } from '@tanstack/react-query';
import GroupService from './service';
import { QueryConfig } from '@/lib/react-query';

export const getGroupQueryOptions = (groupId: number) => {
  return queryOptions({
    queryKey: ['groups', groupId],
    queryFn: () => GroupService.fetchGroup(groupId),
  });
};

type UseGroupOptions = {
  groupId: number;
  queryConfig?: QueryConfig<typeof getGroupQueryOptions>;
};

export const useGroup = ({ groupId, queryConfig }: UseGroupOptions) => {
  return useQuery({ ...getGroupQueryOptions(groupId), ...queryConfig });
};
