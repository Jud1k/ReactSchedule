import { Button } from '@/components/generic/Button';
import { FormInput } from '@/components/generic/FormInput';
import FormSelect from '@/components/generic/FormSelect';
import { Update } from '@/components/generic/Icons';
import Modal from '@/components/generic/Modal';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { DEPARTMENTS, TITLES } from '../types/consts';
import {
  updateTeacherFormSchema,
  useUpdateTeacher,
} from '../api/update-teacher';
import { Teacher } from '../api/service';

interface UpdateTeacherProps {
  teacher: Teacher;
}

export const UpdateTeacher = ({ teacher }: UpdateTeacherProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(updateTeacherFormSchema),
    mode: 'onSubmit',
  });

  const updateTeacherMutation = useUpdateTeacher({
    mutationConfig: {
      onSuccess: () => {
        setIsModalOpen(false);
      },
    },
  });
  return (
    <Modal
      header="Добавить нового преподавателя"
      isOpen={isModalOpen}
      triggerButton={
        <Button
          icon={<Update />}
          onClick={() => {
            reset({
              ...teacher,
            });
            setIsModalOpen(true);
          }}
        ></Button>
      }
      onClose={() => {
        setIsModalOpen(false);
        reset();
      }}
    >
      <form
        className="flex flex-col items-center justify-center space-y-4 w-full"
        onSubmit={handleSubmit((data) =>
          updateTeacherMutation.mutate({ teacherId: teacher.id, data }),
        )}
      >
        <FormInput
          label="ФИО преподавателя"
          type="text"
          placeholder="Введите ФИО преподатаеля"
          registration={register('name')}
          error={errors.name?.message}
        />
        <FormInput
          label="Email"
          type="email"
          placeholder="Введите email"
          registration={register('email')}
          error={errors.email?.message}
        />
        <FormInput
          label="Телефон"
          type="text"
          placeholder="Введите телефон"
          registration={register('phone')}
          error={errors.phone?.message}
        />
        <FormSelect label="Кафедра" registration={register('department')}>
          {DEPARTMENTS.map((depart) => (
            <option key={depart} value={depart}>
              {depart}
            </option>
          ))}
        </FormSelect>
        <FormSelect label="Степень" registration={register('title')}>
          {TITLES.map((title) => (
            <option key={title} value={title}>
              {title}
            </option>
          ))}
        </FormSelect>
        <Button
          type="submit"
          disabled={updateTeacherMutation.isPending}
          className="w-full"
        >
          Изменить преподавателя
        </Button>
      </form>
    </Modal>
  );
};
