import { FormInput } from "@/components/generic/FormInput";
import Modal from "@/components/generic/Modal";
import { useForm } from "react-hook-form";
import { groupFormSchema, GroupFormData } from "@/schemas/forms/group";
import { zodResolver } from "@hookform/resolvers/zod";
import ScheduleService from "@/services/ScheduleServie";
import axios from "axios";
import { Panel, PanelBody, PanelHeader } from "@/components/generic/Panel";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import Select from "@/components/generic/Select";
import { SlNote, SlTrash } from "react-icons/sl";
import { GroupSummary } from "@/schemas";

const GroupPage = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingGroup, setEditingGroup] = useState<GroupSummary | null>(null);

  const courses = [1, 2, 3, 4, 5, 6];
  const institutes = [
    "ИТИ",
    "ХТИ",
    "ИЛП",
    "СЭИ",
    "Очно-заочное",
    "ИЗО",
    "Колледж",
    "Высшая школа",
  ];

  const { data: groups } = useQuery({
    queryKey: ["groups"],
    queryFn: () => ScheduleService.fetchGroupSummary(),
    staleTime: 5 * 60,
  });

  const queryClient = useQueryClient();

  const deleteGroupMutation = useMutation({
    mutationFn: (groupId: number) => ScheduleService.deleteGroup(groupId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["groups"] });
    },
  });

  const createGroupMutation = useMutation({
    mutationFn: (group: GroupFormData) => ScheduleService.createGroup(group),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["groups"] });
      setIsModalOpen(false);
      reset();
      setEditingGroup(null);
    },
    onError: (e: unknown) => {
      if (axios.isAxiosError(e)) {
        setError("root", { type: "manual", message: e.response?.data?.detail });
      } else {
        console.log(e);
      }
    },
  });

  const updateGroupMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: GroupFormData }) =>
      ScheduleService.updateGroup(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["groups"] });
      setIsModalOpen(false);
      reset();
      setEditingGroup(null);
    },
    onError: (e: unknown) => {
      if (axios.isAxiosError(e)) {
        setError("root", { type: "manual", message: e.response?.data?.detail });
      } else {
        console.log(e);
      }
    },
  });

  const handleDelete = (groupId: number) => {
    if (confirm("Удалить группу?")) {
      deleteGroupMutation.mutate(groupId);
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<GroupFormData>({
    resolver: zodResolver(groupFormSchema),
    mode: "onSubmit",
  });

  const onSubmit = async (data: GroupFormData) => {
    try {
      if (editingGroup) {
        updateGroupMutation.mutate({ id: editingGroup.id, data });
      } else {
        createGroupMutation.mutate(data);
      }
      setIsModalOpen(false);
      reset();
      setEditingGroup(null);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        setError("root", { type: "manual", message: e.response?.data?.detail });
      } else {
        console.log(e);
      }
    }
  };

  const registerCourse = register("course", {
    setValueAs: (value) => (value === "" ? undefined : Number(value)),
  });

  const handleCLose = () => {
    setEditingGroup(null);
    setIsModalOpen(false);
    reset({});
  };

  const handleEdit = (group: GroupSummary) => {
    setEditingGroup(group);
    setIsModalOpen(true);
    reset({
      name: group.name,
      course: group.course,
      institute: group.institute,
    });
  };

  return (
    <>
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Редактирование групп
          </h2>
          <p className="text-muted-foreground">
            Управляйте группами и их деталями
          </p>
        </div>
        <Modal
          title="Добавить группу"
          header={editingGroup ? "Изменить группу" : "Добавить новую группу"}
          isOpen={isModalOpen}
          onClick={() => {
            setEditingGroup(null);
            reset();
            setIsModalOpen(true);
          }}
          onClose={handleCLose}
        >
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-center justify-center space-y-4 w-full"
          >
            {errors.root && (
              <div
                role="alert"
                className="alert alert-error alert-outline w-full"
              >
                <span>{errors.root.message}</span>
              </div>
            )}
            <div className="w-full space-y-4">
              <FormInput
                label="Название группы"
                placeholder="Введите название группы"
                error={errors.name?.message}
                registration={register("name")}
              />
              <Select
                label="Курс"
                registration={registerCourse}
                error={errors.course?.message}
              >
                {courses.map((course) => (
                  <option key={course} value={course}>
                    {course}
                  </option>
                ))}
              </Select>
              <Select
                label="Институт"
                registration={register("institute")}
                error={errors.institute?.message}
              >
                {institutes.map((inst) => (
                  <option key={inst} value={inst}>
                    {inst}
                  </option>
                ))}
              </Select>
            </div>
            <div className="form-control  w-full">
              <button
                type="submit"
                className="btn w-full"
                disabled={isSubmitting}
              >
                {editingGroup ? "Изменить группу" : "Добавить группу"}
              </button>
            </div>
          </form>
        </Modal>
      </div>
      <Panel>
        <PanelHeader>
          <h3>Группы ({groups?.length || 0})</h3>
        </PanelHeader>
        <PanelBody>
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Название</th>
                  <th>Курс</th>
                  <th>Институт</th>
                  <th>Кол-во студентов</th>
                  <th>Действия</th>
                </tr>
              </thead>
              <tbody>
                {groups?.map((group) => (
                  <tr key={group.id}>
                    <th>{group.name}</th>
                    <td>{group.course}</td>
                    <td>{group.institute}</td>
                    <td>{group.count_students}</td>
                    <td>
                      <button className="btn" onClick={() => handleEdit(group)}>
                        <SlNote />
                      </button>
                      <button
                        className="btn"
                        onClick={() => handleDelete(group.id)}
                      >
                        <SlTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </PanelBody>
      </Panel>
    </>
  );
};

export default GroupPage;
