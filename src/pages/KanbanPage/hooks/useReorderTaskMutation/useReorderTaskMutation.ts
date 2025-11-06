import type { ReorderVariables } from '../../types';
import type { Task } from 'types/task';
import { useMutation, useQueryClient, type InfiniteData } from '@tanstack/react-query';
import { httpClient, taskApiService, QueryKeys, type TaskCursorResponse } from 'api';
import { addTaskToPages, removeTaskFromPages } from './helpers';

export const useReorderTaskMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, status, nextTaskId }: ReorderVariables) => {
      const result = await httpClient<Task>(taskApiService.reorder(id, { status, nextTaskId }));
      return result.data;
    },

    onSuccess: async (updatedTask, variables) => {
      await queryClient.cancelQueries({ queryKey: QueryKeys.infiniteTasks });
      void queryClient.invalidateQueries({ queryKey: QueryKeys.tasks });
      const { id, status: newStatus, oldStatus, nextTaskId } = variables;

      if (oldStatus !== newStatus) {
        queryClient.setQueryData<InfiniteData<TaskCursorResponse>>(
          [...QueryKeys.infiniteTasks, oldStatus],
          (prevData) => {
            if (!prevData) return;
            return removeTaskFromPages(prevData, id);
          },
        );

        queryClient.setQueryData<InfiniteData<TaskCursorResponse>>(
          [...QueryKeys.infiniteTasks, newStatus],
          (prevData) => {
            if (!prevData) return;
            return addTaskToPages(prevData, updatedTask, nextTaskId);
          },
        );
        return;
      }

      queryClient.setQueryData<InfiniteData<TaskCursorResponse>>(
        [...QueryKeys.infiniteTasks, newStatus],
        (prevData) => {
          if (!prevData) return;
          const dataAfterRemove = removeTaskFromPages(prevData, id);
          const dataAfterAdd = addTaskToPages(dataAfterRemove, updatedTask, nextTaskId);
          return dataAfterAdd;
        },
      );
    },
  });
};
