import { Box } from '@mui/material';
import { CommonModal } from 'components/CommonModal';
import { GridView, GridViewSkeleton, ListView, ListViewSkeleton } from './components';
import { TaskCard } from '../TaskCard';
import { useModal } from 'hooks';
import { memo, useState, type FC, type ReactNode } from 'react';
import type { ViewModeValues } from '../../types';
import type { Task } from 'types/task';
import type { Nullable } from 'types/utils';
import { useTranslation } from 'react-i18next';

interface TaskListProps {
  tasks: Task[];
  viewMode: ViewModeValues;
  onEditTask: (task: Task) => void;
  onCompleteTask: (id: Task['id']) => Promise<void>;
  onDeleteTask: (id: Task['id']) => Promise<void>;
  isLoading: boolean;
}

export const TaskList: FC<TaskListProps> = memo(
  ({ tasks, viewMode, onEditTask, onCompleteTask, onDeleteTask, isLoading }) => {
    const { t } = useTranslation('tasksPage');
    const {
      isOpen: isTaskItemModalOpen,
      openModal: openTaskItemModal,
      closeModal: closeTaskItemModal,
    } = useModal();

    const [selectedTaskId, setSelectedTaskId] = useState<Nullable<Task['id']>>(null);

    const selectedTask = tasks.find((task) => task.id === selectedTaskId);

    const handleTaskItemClick = (id: Task['id']) => {
      setSelectedTaskId(id);
      openTaskItemModal();
    };

    const handleEditFromDetails = (task: Task) => {
      closeTaskItemModal();
      onEditTask(task);
    };

    const viewMap: Record<ViewModeValues, ReactNode> = {
      grid: isLoading ? (
        <GridViewSkeleton />
      ) : (
        <GridView
          tasks={tasks}
          onCompleteTask={onCompleteTask}
          onDeleteTask={onDeleteTask}
          onEditTask={onEditTask}
        />
      ),
      list: isLoading ? (
        <ListViewSkeleton />
      ) : (
        <ListView tasks={tasks} onTaskClick={handleTaskItemClick} />
      ),
    };

    if (tasks.length === 0 && !isLoading) {
      return <Box sx={{ textAlign: 'center', p: 4 }}>{t('list.emptyMsg')}</Box>;
    }

    return (
      <Box>
        {viewMap[viewMode]}
        {selectedTask && (
          <CommonModal
            open={isTaskItemModalOpen}
            handleClose={closeTaskItemModal}
            title={t('list.detailsTitle')}
          >
            <TaskCard
              task={selectedTask}
              onComplete={onCompleteTask}
              onDelete={onDeleteTask}
              onEdit={handleEditFromDetails}
            />
          </CommonModal>
        )}
      </Box>
    );
  },
);
