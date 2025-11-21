import { FormAutocomplete } from '@/components/generic/FormAutocomplete';
import { FormAutocompleteItem } from '@/components/generic/FormAutocompleteItem';
import { FormAutocompleteList } from '@/components/generic/FormAutocompleteList';
import Spinner from '@/components/generic/Spinner';
import { useTeachers } from '@/features/teacher/api/get-teachers';
import { useState } from 'react';

interface AutocompleteTeacherProps {
  onClick: (id: string) => void;
  errorText?: string;
  value: string;
  onChange: (value: string) => void;
}

export const AutocompleteTeacher = ({
  onClick,
  errorText,
  value = '',
  onChange,
}: AutocompleteTeacherProps) => {
  const [isListOpen, setIsListOpen] = useState<boolean>(false);

  const teachersQuery = useTeachers({});
  const teachers = teachersQuery.data;

  const filteredTeachers = teachers?.filter((teacher) => {
    const input = value.toLowerCase().trim();
    const fullName =
      `${teacher.first_name} ${teacher.middle_name || ''} ${teacher.last_name}`
        .toLowerCase()
        .trim();

    return fullName.includes(input);
  });

  const handleTeacherSelect = (teacherId: string, teacherName: string) => {
    onChange(teacherName);
    onClick(teacherId);
    setIsListOpen(false);
  };

  return (
    <FormAutocomplete
      setIsOpen={setIsListOpen}
      label="Учитель"
      placeholder="Введите ФИО учителя"
      errorText={errorText}
      inputValue={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {isListOpen && (teachers?.length ?? 0) > 0 && (
        <FormAutocompleteList>
          {filteredTeachers?.map((teacher) => (
            <FormAutocompleteItem
              itemKey={teacher.id}
              onClick={() => {
                handleTeacherSelect(teacher.id, teacher.first_name);
              }}
            >
              {`${teacher.last_name} ${teacher.first_name} ${teacher.middle_name || ''}`}
            </FormAutocompleteItem>
          ))}
        </FormAutocompleteList>
      )}
      {isListOpen && teachersQuery.isLoading && (
        <FormAutocompleteList>
          <Spinner />
        </FormAutocompleteList>
      )}
      {isListOpen &&
        !teachersQuery.isLoading &&
        filteredTeachers?.length === 0 && (
          <FormAutocompleteList>
            <div className="p-3 text-center">Ничего не найдено</div>
          </FormAutocompleteList>
        )}
    </FormAutocomplete>
  );
};
