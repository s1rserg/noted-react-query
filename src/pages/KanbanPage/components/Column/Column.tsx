import { Box, Divider, Typography, CircularProgress } from '@mui/material';
import { type FC, useRef, useEffect } from 'react';
import type { Task } from 'types/task';
import { Item } from '../Item';
import { SortableContext } from '@dnd-kit/sortable';
import { useDroppable } from '@dnd-kit/core';
import { SortableItem } from './components';
import type { Nullable } from 'types/utils';

interface Props {
  id: string;
  title: string;
  tasks: Task[];
  hasMore: boolean;
  isLoadingMore: boolean;
  onLoadMore: () => void;
}

export const Column: FC<Props> = ({ id, title, tasks, hasMore, isLoadingMore, onLoadMore }) => {
  const { setNodeRef } = useDroppable({
    id: id,
    data: { columnId: id },
  });

  const taskIds = tasks.map((task) => task.id);

  const scrollableContainerRef = useRef<Nullable<HTMLDivElement>>(null);
  const observerRef = useRef<Nullable<HTMLDivElement>>(null);

  useEffect(() => {
    const rootElement = scrollableContainerRef.current;
    const currentRef = observerRef.current;
    if (!rootElement || !currentRef || isLoadingMore || !hasMore) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        if (entry.isIntersecting) {
          onLoadMore();
        }
      },
      {
        root: rootElement,
        rootMargin: '0px 0px 300px 0px',
        threshold: 0.01,
      },
    );
    observer.observe(currentRef);

    return () => {
      observer.unobserve(currentRef);
    };
  }, [hasMore, isLoadingMore, onLoadMore]);

  return (
    <Box
      ref={setNodeRef}
      sx={{
        width: '100%',
        minWidth: 300,
        m: 'auto',
        maxHeight: '85dvh',
        p: 2,
        bgcolor: 'background.paper',
        borderRadius: 2,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Typography variant="h5" sx={{ mb: 2, textAlign: 'center' }}>
        {title}
      </Typography>
      <Divider sx={{ mb: 2 }} />

      <Box
        ref={scrollableContainerRef}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          overflowY: 'auto',
          flexGrow: 1,
          pr: 2,
        }}
      >
        <SortableContext items={taskIds}>
          {tasks.map((task) => (
            <SortableItem
              key={task.id}
              id={task.id}
              activeItem={task}
              render={(sortActivatorProps) => (
                <Item task={task} sortActivatorProps={sortActivatorProps} />
              )}
            />
          ))}
        </SortableContext>

        <Box
          ref={observerRef}
          sx={{ display: 'flex', justifyContent: 'center', p: 2, height: '40px' }}
        >
          {isLoadingMore && <CircularProgress size={24} />}
        </Box>
      </Box>
    </Box>
  );
};
