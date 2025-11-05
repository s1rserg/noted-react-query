import { Box } from '@mui/material';
import { toast } from 'react-toastify';
import { useLocalStorage, useModal } from 'hooks';
import { useSearchParams } from 'react-router-dom';
import { type FC, useCallback, useEffect, useState } from 'react';
import { TaskStatus, type Task } from 'types/task';
import { ControlHeader, TaskFormModal, TaskList } from './components';
import { ViewMode, type ViewModeValues } from './types';
import { useTranslation } from 'react-i18next';
import { handleApiError, httpClient, taskApiService, type CreateTaskDto } from 'api';
import { getQueryParameters } from './helpers/getQueryParams';
import type { Nullable } from 'types/utils';

const TasksPage: FC = () => {
  const { t } = useTranslation('tasksPage');
  const [viewMode, setViewMode] = useLocalStorage<ViewModeValues>('taskViewMode', ViewMode.GRID);
  const [searchParams] = useSearchParams();

  const [isLoading, setIsLoading] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isHeaderOpen, setIsHeaderOpen] = useState(true);

  const { isOpen, openModal, closeModal } = useModal();
  const [isFormLoading, setIsFormLoading] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Nullable<Task>>(null);

  const fetchTasks = useCallback(
    async (signal?: AbortSignal) => {
      setIsLoading(true);

      try {
        const requestConfig = taskApiService.findAll(getQueryParameters(searchParams), signal);
        const response = await httpClient<Task[]>(requestConfig);

        setTasks(response.data);
      } catch (error) {
        handleApiError(error);
      } finally {
        setIsLoading(false);
      }
    },
    [searchParams],
  );

  const handleToggleHeader = () => {
    setIsHeaderOpen((prev) => !prev);
  };

  const handleToggleViewMode = () => {
    setViewMode((prev) => (prev === ViewMode.GRID ? ViewMode.LIST : ViewMode.GRID));
  };

  const handleOpenAddModal = () => {
    setTaskToEdit(null);
    openModal();
  };

  const handleOpenEditModal = (task: Task) => {
    setTaskToEdit(task);
    openModal();
  };

  const handleFormSubmit = async (taskData: CreateTaskDto) => {
    setIsFormLoading(true);
    try {
      if (taskToEdit) {
        await httpClient(taskApiService.update(taskToEdit.id, taskData));
        toast.success(t('edit.successMsg'));
      } else {
        await httpClient(taskApiService.create(taskData));
        toast.success(t('add.successMsg'));
      }
      closeModal();
      void fetchTasks();
    } catch (error) {
      handleApiError(error);
    } finally {
      setIsFormLoading(false);
    }
  };

  const handleCompleteTask = useCallback(
    async (id: Task['id']) => {
      try {
        await httpClient(taskApiService.update(id, { status: TaskStatus.COMPLETED }));
        toast.success(t('complete.successMsg'));
        void fetchTasks();
      } catch (error) {
        handleApiError(error);
      }
    },
    [fetchTasks, t],
  );

  const handleDeleteTask = useCallback(
    async (id: Task['id']) => {
      try {
        await httpClient(taskApiService.delete(id));
        toast.success(t('delete.successMsg'));
        void fetchTasks(); //NOTE: needed for pagination later
      } catch (error) {
        handleApiError(error);
      }
    },
    [fetchTasks, t],
  );

  useEffect(() => {
    const controller = new AbortController();
    void fetchTasks(controller.signal);

    return () => {
      controller.abort();
    };
  }, [fetchTasks]);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', gap: 4 }}>
      <ControlHeader
        open={isHeaderOpen}
        toggleOpen={handleToggleHeader}
        onOpenAddTask={handleOpenAddModal}
        viewMode={viewMode}
        toggleViewMode={handleToggleViewMode}
      />
      <TaskList
        tasks={tasks}
        viewMode={viewMode}
        onEditTask={handleOpenEditModal}
        onCompleteTask={handleCompleteTask}
        onDeleteTask={handleDeleteTask}
        isLoading={isLoading}
      />
      <TaskFormModal
        open={isOpen}
        handleClose={closeModal}
        onSubmit={handleFormSubmit}
        isLoading={isFormLoading}
        initialData={taskToEdit}
      />
    </Box>
  );
};

export default TasksPage;
