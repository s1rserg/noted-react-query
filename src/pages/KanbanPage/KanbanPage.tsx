import { useEffect, useState, type FC } from 'react';
import { initialTasks, TaskStatusValues } from './config';
import { Item } from './components';
import { DndContext, DragOverlay } from '@dnd-kit/core';
import { useDndSensors, useKanbanDnd, useKanbanQueries, useReorderTaskMutation } from './hooks';
import { createPortal } from 'react-dom';
import { Loader } from 'components/Loader';
import { TaskStatus } from 'types/task';
import { Grid } from '@mui/material';
import { Column } from './components/Column';
import { useTranslation } from 'react-i18next';

export const KanbanPage: FC = () => {
  const { t } = useTranslation('kanbanPage');
  const sensors = useDndSensors();
  const reorderMutation = useReorderTaskMutation();

  const {
    queryResults,
    globalIsLoading,
    pendingTasks,
    inProgressTasks,
    completedTasks,
    isFetching,
  } = useKanbanQueries();

  const [tasks, setTasks] = useState(initialTasks);

  const { activeTask, handleDragStart, handleDragOver, handleDragEnd } = useKanbanDnd(
    tasks,
    setTasks,
    reorderMutation.mutateAsync,
  );

  useEffect(() => {
    if (isFetching || reorderMutation.isPending) return;
    setTasks({
      [TaskStatus.PENDING]: pendingTasks,
      [TaskStatus.IN_PROGRESS]: inProgressTasks,
      [TaskStatus.COMPLETED]: completedTasks,
    });
  }, [pendingTasks, inProgressTasks, completedTasks, isFetching, reorderMutation.isPending]);

  if (globalIsLoading) {
    return <Loader />;
  }

  return (
    <DndContext
      sensors={sensors}
      onDragEnd={(e) => void handleDragEnd(e)}
      onDragOver={handleDragOver}
      onDragStart={handleDragStart}
    >
      <Grid container spacing={4} justifyContent="center" pt={2}>
        {TaskStatusValues.map((status, index) => {
          const query = queryResults[index];
          if (!query) return null;
          return (
            <Grid key={status} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <Column
                id={status}
                title={t(`columnLabels.${status}`)}
                tasks={tasks[status] || []}
                query={query}
              />
            </Grid>
          );
        })}
      </Grid>
      {createPortal(
        <DragOverlay>{activeTask ? <Item task={activeTask} /> : null}</DragOverlay>,
        document.body,
      )}
    </DndContext>
  );
};
