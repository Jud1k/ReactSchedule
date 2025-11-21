import { FormAutocomplete } from '@/components/generic/FormAutocomplete';
import { FormAutocompleteItem } from '@/components/generic/FormAutocompleteItem';
import { FormAutocompleteList } from '@/components/generic/FormAutocompleteList';
import Spinner from '@/components/generic/Spinner';
import { useRooms } from '@/features/room/api/get-rooms';
import { useState } from 'react';

interface AutocompleteRoomProps {
  errorText?: string;
  onClick: (id: string) => void;
  value: string;
  onChange: (value: string) => void;
}

export default function AutocompleteRoom({
  errorText,
  onClick,
  value = '',
  onChange,
}: AutocompleteRoomProps) {
  const [isListOpen, setIsListOpen] = useState<boolean>(false);

  const roomsQuery = useRooms({});
  const rooms = roomsQuery.data;

  const filtredrooms = rooms?.filter((room) => {
    const input = value.toLowerCase().trim();
    const matchesrooms = room.name.toLowerCase().includes(input);
    return matchesrooms;
  });

  const handleroomselect = (roomId: string, roomName: string) => {
    onChange(roomName);
    onClick(roomId);
    setIsListOpen(false);
  };

  return (
    <FormAutocomplete
      label="Аудитория"
      placeholder="Введите название аудитории"
      errorText={errorText}
      inputValue={value}
      onChange={(e) => onChange(e.target.value)}
      setIsOpen={setIsListOpen}
    >
      {isListOpen && (rooms?.length ?? 0) > 0 && (
        <FormAutocompleteList>
          {filtredrooms?.map((room) => (
            <FormAutocompleteItem
              itemKey={room.id}
              onClick={() => handleroomselect(room.id, room.name)}
            >
              {room.name}
            </FormAutocompleteItem>
          ))}
        </FormAutocompleteList>
      )}
      {isListOpen && roomsQuery.isLoading && (
        <FormAutocompleteList>
          <Spinner />
        </FormAutocompleteList>
      )}
      {isListOpen && !roomsQuery.isLoading && rooms?.length === 0 && (
        <FormAutocompleteList>
          <div className="p-3 text-center">Ничего не найдена</div>
        </FormAutocompleteList>
      )}
    </FormAutocomplete>
  );
}
