import type { InfiniteData } from '@tanstack/react-query';
import type { TaskCursorResponse } from 'api';

export const removeTaskFromPages = (prevData: InfiniteData<TaskCursorResponse>, taskId: string) => {
  const newPages = prevData.pages.map((page) => ({
    ...page,
    data: page.data.filter((task) => task.id !== taskId),
  }));
  return { ...prevData, pages: newPages };
};
