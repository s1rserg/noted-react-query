import { Box } from '@mui/material';
import { useLocalStorage, useModal } from 'hooks';
import { useSearchParams } from 'react-router-dom';
import { type FC, useState } from 'react';
import { type Task } from 'types/task';
import { ControlHeader, TaskFormModal, TaskList } from './components';
import { ViewMode, type ViewModeValues } from './types';
import { type CreateTaskDto } from 'api';
import type { Nullable } from 'types/utils';
import {
  useCreateTask,
  useUpdateTask,
  useDeleteTask,
  useCompleteTask,
  useGetAllTasks,
} from './hooks';

const TasksPage: FC = () => {
  const [viewMode, setViewMode] = useLocalStorage<ViewModeValues>('taskViewMode', ViewMode.GRID);
  const [searchParams] = useSearchParams();

  const { tasks, isLoading } = useGetAllTasks(searchParams);

  const { mutate: createTask, isPending: isCreating } = useCreateTask();
  const { mutate: updateTask, isPending: isUpdating } = useUpdateTask();
  const { mutate: deleteTask } = useDeleteTask();
  const { mutate: completeTask } = useCompleteTask();

  const [isHeaderOpen, setIsHeaderOpen] = useState(true);

  const { isOpen, openModal, closeModal } = useModal();
  const [taskToEdit, setTaskToEdit] = useState<Nullable<Task>>(null);

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

  const handleFormSubmit = (taskData: CreateTaskDto) => {
    if (taskToEdit) {
      updateTask({ id: taskToEdit.id, data: taskData }, { onSuccess: () => closeModal() });
    } else {
      createTask(taskData, { onSuccess: () => closeModal() });
    }
  };

  const handleCompleteTask = (id: Task['id']) => {
    completeTask(id);
  };

  const handleDeleteTask = (id: Task['id']) => {
    deleteTask(id);
  };

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
        tasks={tasks ?? []}
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
        isLoading={isCreating || isUpdating}
        initialData={taskToEdit}
      />
    </Box>
  );
};

export default TasksPage;
