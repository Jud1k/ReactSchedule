import { EntityState } from '../types/entity';
import Badge from '@/components/generic/Badge';
import Spinner from '@/components/generic/Spinner';

interface EntityInfoProps {
  entityState: EntityState;
}

export const EntityInfo = ({ entityState }: EntityInfoProps) => {
  if (entityState.type === 'none') {
    return null;
  }

  if (entityState.isLoading) {
    return <Spinner />;
  }

  if (entityState.error) {
    return <Badge variant="error">{entityState.error}</Badge>;
  }

  if (!entityState.data) {
    return null;
  }

  switch (entityState.type) {
    case 'group':
      return (
        <div className="mb-4">
          <Badge size="xl">{entityState.data.name}</Badge>
          <div className="text-sm text-gray-600 mt-1"></div>
        </div>
      );

    case 'teacher':
      return (
        <div className="mb-4">
          <Badge size="xl">{entityState.data.first_name}</Badge>
          <div className="text-sm text-gray-600 mt-1"></div>
        </div>
      );

    case 'room':
      return (
        <div className="mb-4">
          <Badge size="xl">{entityState.data.name}</Badge>
          <div className="text-sm text-gray-600 mt-1"></div>
        </div>
      );

    default:
      return null;
  }
};
