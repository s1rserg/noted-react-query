import { Grid } from '@mui/material';
import { useEffect, useState, type FC } from 'react';
import { initialTasks, TaskStatusValues } from './config';
import { Column, Item } from './components';
import { useTranslation } from 'react-i18next';
import { DndContext, DragOverlay } from '@dnd-kit/core';
import { useApi, useDndSensors, useKanbanDnd, useKanbanPagination } from './hooks';
import { createPortal } from 'react-dom';
import { Loader } from 'components/Loader';
import type { PageInfo } from './types';
import type { Task } from 'types/task';

export const KanbanPage: FC = () => {
  const { t } = useTranslation('kanbanPage');

  const sensors = useDndSensors();

  const [tasks, setTasks] = useState(initialTasks);
  const [globalIsLoading, setGlobalIsLoading] = useState(true);

  const [pageInfo, setPageInfo] = useState<Record<Task['status'], PageInfo>>(
    TaskStatusValues.reduce(
      (acc, status) => {
        acc[status] = { hasMore: true, isLoading: false };
        return acc;
      },
      {} as Record<Task['status'], PageInfo>,
    ),
  );

  const { fetchTasks, handleReorderTask } = useApi(setTasks);
  const { handleLoadMore } = useKanbanPagination(tasks, pageInfo, setPageInfo, fetchTasks);

  const { activeTask, handleDragStart, handleDragOver, handleDragEnd } = useKanbanDnd(
    tasks,
    setTasks,
    handleReorderTask,
  );

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const loadInitialTasks = async () => {
      setGlobalIsLoading(true);

      const fetchPromises = TaskStatusValues.map(async (status) => {
        setPageInfo((prev) => ({
          ...prev,
          [status]: { ...prev[status], isLoading: true },
        }));

        const response = await fetchTasks(status, undefined, signal);

        if (!signal.aborted) {
          setPageInfo((prev) => ({
            ...prev,
            [status]: { hasMore: response.hasMore, isLoading: false },
          }));
        }
      });

      await Promise.all(fetchPromises);

      if (!signal.aborted) {
        setGlobalIsLoading(false);
      }
    };

    void loadInitialTasks();

    return () => controller.abort();
  }, [fetchTasks]);

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
        {TaskStatusValues.map((status) => (
          <Grid key={status} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <Column
              id={status}
              title={t(`columnLabels.${status}`)}
              tasks={tasks[status] || []}
              hasMore={pageInfo[status]?.hasMore ?? false}
              isLoadingMore={pageInfo[status]?.isLoading ?? false}
              onLoadMore={() => void handleLoadMore(status)}
            />
          </Grid>
        ))}
      </Grid>
      {createPortal(
        <DragOverlay>{activeTask ? <Item task={activeTask} /> : null}</DragOverlay>,
        document.body,
      )}
    </DndContext>
  );
};
