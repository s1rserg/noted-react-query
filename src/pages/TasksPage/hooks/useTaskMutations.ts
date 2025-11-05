import { useMutation, useQueryClient } from '@tanstack/react-query';
import { httpClient, QueryKeys, taskApiService, type CreateTaskDto, type UpdateTaskDto } from 'api';
import { toast } from 'react-toastify';
import { i18next } from 'config/i18n';
import { TaskStatus, type Task } from 'types/task';

const useInvalidateTasks = () => {
  const queryClient = useQueryClient();
  return async () =>
    queryClient.invalidateQueries({
      queryKey: QueryKeys.tasks,
    });
};

export const useCreateTask = () => {
  const invalidateTasks = useInvalidateTasks();

  return useMutation({
    mutationFn: async (data: CreateTaskDto) => httpClient(taskApiService.create(data)),
    onSuccess: async () => {
      toast.success(i18next.t('tasksPage:add.successMsg'));
      await invalidateTasks();
    },
  });
};

export const useUpdateTask = () => {
  const invalidateTasks = useInvalidateTasks();

  return useMutation({
    mutationFn: async ({ id, data }: { id: Task['id']; data: UpdateTaskDto }) =>
      httpClient(taskApiService.update(id, data)),
    onSuccess: async () => {
      toast.success(i18next.t('tasksPage:edit.successMsg'));
      await invalidateTasks();
    },
  });
};

export const useDeleteTask = () => {
  const queryKey = QueryKeys.tasks;
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: Task['id']) => {
      await httpClient(taskApiService.delete(id));
    },

    onMutate: async (idToDelete: Task['id']) => {
      await queryClient.cancelQueries({ queryKey });
      const previousTasks = queryClient.getQueriesData<Task[]>({ queryKey });

      previousTasks.forEach(([key, oldData]) => {
        if (!oldData) return;
        const newData = oldData.filter((task) => task.id !== idToDelete);
        queryClient.setQueryData(key, newData);
      });

      return { previousTasks };
    },

    onError: (_, __, context) => {
      if (context?.previousTasks) {
        context.previousTasks.forEach(([key, data]) => {
          queryClient.setQueryData(key, data);
        });
      }
    },

    onSuccess: () => {
      toast.success(i18next.t('tasksPage:delete.successMsg'));
    },

    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey });
    },
  });
};

export const useCompleteTask = () => {
  const queryKey = QueryKeys.tasks;
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: Task['id']) => {
      const data: UpdateTaskDto = { status: TaskStatus.COMPLETED };
      const requestConfig = taskApiService.update(id, data);
      await httpClient(requestConfig);
    },

    onMutate: async (idToComplete: Task['id']) => {
      await queryClient.cancelQueries({ queryKey });
      const previousTasks = queryClient.getQueriesData<Task[]>({ queryKey });

      previousTasks.forEach(([key, oldData]) => {
        if (!oldData) return;
        const newData = oldData.map((task) =>
          task.id === idToComplete ? { ...task, status: TaskStatus.COMPLETED } : task,
        );
        queryClient.setQueryData(key, newData);
      });

      return { previousTasks };
    },

    onError: (_, __, context) => {
      if (context?.previousTasks) {
        context.previousTasks.forEach(([key, data]) => {
          queryClient.setQueryData(key, data);
        });
      }
    },

    onSuccess: () => {
      toast.success(i18next.t('tasksPage:complete.successMsg'));
    },

    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey });
    },
  });
};
