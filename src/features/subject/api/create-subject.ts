import { MutationConfig } from '@/lib/react-query';
import { z } from 'zod';
import SubjectService from './service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useErrorHandler } from '@/hooks/useErrorHandler';
import { getSubjectsQueryOptions } from './get-subjects';

export const createSubjectFormSchema = z.object({
  name: z.string(),
  semester: z.number(),
  total_hours: z.number(),
  is_optional: z.boolean(),
});

export type CreateSubjectForm = z.infer<typeof createSubjectFormSchema>;

type CreateSubjectOptions = {
  successMessage?: string;
  mutationConfig?: MutationConfig<typeof SubjectService.createSubject>;
};

export const useCreateSubject = ({
  successMessage,
  mutationConfig,
}: CreateSubjectOptions) => {
  const qeuryClient = useQueryClient();
  const { handleApiError, handleSuccess } = useErrorHandler();

  const { onSuccess, ...restConfig } = mutationConfig || {};
  return useMutation({
    onSuccess: (...args) => {
      qeuryClient.invalidateQueries({
        queryKey: getSubjectsQueryOptions().queryKey,
      });
      handleSuccess(successMessage || 'Предмет успешно создан');
      onSuccess?.(...args);
    },
    onError: (erorr: unknown) => {
      handleApiError(erorr);
    },
    ...restConfig,
    mutationFn: SubjectService.createSubject,
  });
};
