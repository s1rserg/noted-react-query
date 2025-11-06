import { useInfiniteQuery } from '@tanstack/react-query';
import { getInfiniteTasksQueryOptions } from 'api';
import { TaskStatus } from 'types/task';
import { useMemo } from 'react';

export const useKanbanQueries = () => {
  const pendingQuery = useInfiniteQuery(getInfiniteTasksQueryOptions(TaskStatus.PENDING));
  const inProgressQuery = useInfiniteQuery(getInfiniteTasksQueryOptions(TaskStatus.IN_PROGRESS));
  const completedQuery = useInfiniteQuery(getInfiniteTasksQueryOptions(TaskStatus.COMPLETED));

  const queryResults = [pendingQuery, inProgressQuery, completedQuery];

  const globalIsLoading = queryResults.some((q) => q.isLoading && !q.isFetchingNextPage);
  const isFetching = queryResults.some((q) => q.isFetching);

  const pendingTasks = useMemo(
    () => pendingQuery.data?.pages?.flatMap((page) => page.data) ?? [],
    [pendingQuery.data],
  );

  const inProgressTasks = useMemo(
    () => inProgressQuery.data?.pages?.flatMap((page) => page.data) ?? [],
    [inProgressQuery.data],
  );

  const completedTasks = useMemo(
    () => completedQuery.data?.pages?.flatMap((page) => page.data) ?? [],
    [completedQuery.data],
  );

  return {
    queryResults,
    globalIsLoading,
    isFetching,
    pendingTasks,
    inProgressTasks,
    completedTasks,
  };
};
