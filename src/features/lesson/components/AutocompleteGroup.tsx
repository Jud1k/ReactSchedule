import { FormAutocomplete } from '@/components/generic/FormAutocomplete';
import { FormAutocompleteItem } from '@/components/generic/FormAutocompleteItem';
import { FormAutocompleteList } from '@/components/generic/FormAutocompleteList';
import Spinner from '@/components/generic/Spinner';
import { useGroups } from '@/features/group/api/get-groups';
import { useState } from 'react';

interface AutocompleteGroupProps {
  errorText?: string;
  onClick: (id: string) => void;
  value: string;
  onChange: (value: string) => void;
}
export const AutocompleteGroup = ({
  errorText,
  onClick,
  value = '',
  onChange,
}: AutocompleteGroupProps) => {
  const [isListOpen, setIsListOpen] = useState<boolean>(false);

  const groupsQuery = useGroups({});
  const groups = groupsQuery.data;

  const filtredgroups = groups?.filter((group) => {
    const input = value.toLowerCase().trim();
    const matchesgroups = group.name.toLowerCase().includes(input);
    return matchesgroups;
  });

  const handlegroupselect = (groupId: string, groupName: string) => {
    onChange(groupName);
    onClick(groupId);
    setIsListOpen(false);
  };

  return (
    <FormAutocomplete
      label="Группа"
      placeholder="Введите название группы"
      errorText={errorText}
      inputValue={value}
      onChange={(e) => onChange(e.target.value)}
      setIsOpen={setIsListOpen}
    >
      {isListOpen && (groups?.length ?? 0) > 0 && (
        <FormAutocompleteList>
          {filtredgroups?.map((group) => (
            <FormAutocompleteItem
              itemKey={group.id}
              onClick={() => handlegroupselect(group.id, group.name)}
            >
              {group.name}
            </FormAutocompleteItem>
          ))}
        </FormAutocompleteList>
      )}
      {isListOpen && groupsQuery.isLoading && (
        <FormAutocompleteList>
          <Spinner />
        </FormAutocompleteList>
      )}
      {isListOpen && !groupsQuery.isLoading && groups?.length === 0 && (
        <FormAutocompleteList>
          <div className="p-3 text-center">Ничего не найдена</div>
        </FormAutocompleteList>
      )}
    </FormAutocomplete>
  );
};
