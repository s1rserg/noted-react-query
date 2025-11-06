import type { InfiniteData } from '@tanstack/react-query';
import type { TaskCursorResponse } from 'api';
import type { Task } from 'types/task';
import type { Nullable } from 'types/utils';

export const addTaskToPages = (
  prevData: InfiniteData<TaskCursorResponse>,
  task: Task,
  nextTaskId: Nullable<string>,
) => {
  const newPages = [...prevData.pages];

  if (!nextTaskId) {
    const lastPage = newPages.at(-1);

    if (lastPage) {
      const newPageData = [...lastPage.data, task];
      newPages[newPages.length - 1] = { ...lastPage, data: newPageData };
    }

    return { ...prevData, pages: newPages };
  }

  for (let i = 0; i < newPages.length; i++) {
    const page = newPages[i];
    if (!page) continue;

    const targetIndex = page.data.findIndex((t) => t.id === nextTaskId);

    if (targetIndex !== -1) {
      const newPageData = [...page.data];
      newPageData.splice(targetIndex, 0, task);
      newPages[i] = { ...page, data: newPageData };

      return { ...prevData, pages: newPages };
    }
  }

  return prevData;
};
