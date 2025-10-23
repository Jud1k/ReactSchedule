import { FormInput } from '@/components/generic/FormInput';
import FormSelect from '@/components/generic/FormSelect';
import Modal from '@/components/generic/Modal';
import Switch from '@/components/generic/Switch';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  CreateRoomForm,
  createRoomFormSchema,
  useCreateRoom,
} from '../api/create-room';
import { useState } from 'react';
import { Button } from '@/components/generic/Button';
import { Create } from '@/components/generic/Icons';
import { useBuildings } from '../api/get-buildings';

export const CreateRoom = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreateRoomForm>({
    defaultValues: { status: 1 },
    resolver: zodResolver(createRoomFormSchema),
    mode: 'onSubmit',
  });

  const statusValue = watch('status');

  const createRoomMutation = useCreateRoom({
    mutationConfig: {
      onSuccess: () => {
        setIsModalOpen(false);
        reset();
      },
    },
  });

  const buildingsQuery = useBuildings({});
  const buildings = buildingsQuery.data;

  return (
    <Modal
      header="Добавить новую аудиторию"
      triggerButton={
        <Button
          icon={<Create />}
          onClick={() => {
            reset();
            setIsModalOpen(true);
          }}
        >
          Добавить аудиторию
        </Button>
      }
      onClose={() => {
        setIsModalOpen(false);
        reset();
      }}
      isOpen={isModalOpen}
    >
      <form
        className="flex flex-col items-center justify-center space-y-4 w-full"
        onSubmit={handleSubmit((data) => createRoomMutation.mutate(data))}
      >
        <FormInput
          label="Название аудитории"
          placeholder="Введите название аудитории"
          registration={register('name')}
          error={errors.name?.message}
        />
        <FormInput
          label="Номер этажа"
          placeholder="Введите номер этажа"
          type="number"
          registration={register('floor', {
            setValueAs: (value) => (value === undefined ? '' : Number(value)),
          })}
          error={errors.floor?.message}
        />
        <FormInput
          label="Вместимость"
          placeholder="Введите вместимость ауд."
          type="number"
          registration={register('capacity', {
            setValueAs: (value) => (value === undefined ? '' : Number(value)),
          })}
          error={errors.capacity?.message}
        />
        <FormSelect
          label="Корпус"
          registration={register('building_id', {
            setValueAs: (value) => (value === undefined ? '' : Number(value)),
          })}
          error={errors.building_id?.message}
        >
          {buildings?.map((build) => (
            <option key={build.id} value={build.id}>
              {build.name}
            </option>
          ))}
        </FormSelect>
        <div className="flex items-center gap-4 w-full">
          <Switch
            checked={statusValue === 1}
            onChange={(e) => setValue('status', e.target.checked ? 1 : 0)}
          />
          <span className="text-sm font-medium">Аудитория доступна</span>
        </div>
        <div className="form-control w-full">
          <button
            type="submit"
            className="btn w-full"
            disabled={createRoomMutation.isPending}
          >
            Добавить аудиторию
          </button>
        </div>
      </form>
    </Modal>
  );
};
