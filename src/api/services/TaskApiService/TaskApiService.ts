import type { AxiosRequestConfig } from 'axios';
import type {
  CreateTaskDto,
  ReorderTaskDto,
  TaskCursorParams,
  TaskQueryParameters,
  UpdateTaskDto,
} from './types';
import type { Task } from 'types/task';

class TaskApiService {
  public findAll(queryParams: TaskQueryParameters, signal?: AbortSignal): AxiosRequestConfig {
    return {
      method: 'GET',
      url: '/tasks/',
      params: queryParams,
      signal,
    };
  }

  public findAllCursor(queryParams: TaskCursorParams, signal?: AbortSignal): AxiosRequestConfig {
    return {
      method: 'GET',
      url: '/tasks/cursor',
      params: queryParams,
      signal,
    };
  }

  public findOne(id: Task['id'], signal?: AbortSignal): AxiosRequestConfig {
    return {
      method: 'GET',
      url: `/tasks/${id}`,
      signal,
    };
  }

  public create(data: CreateTaskDto): AxiosRequestConfig {
    return {
      method: 'POST',
      url: '/tasks/',
      data,
    };
  }

  public update(id: Task['id'], data: UpdateTaskDto): AxiosRequestConfig {
    return {
      method: 'PATCH',
      url: `/tasks/${id}`,
      data,
    };
  }

  public reorder(id: Task['id'], data: ReorderTaskDto): AxiosRequestConfig {
    return {
      method: 'PATCH',
      url: `/tasks/${id}/reorder`,
      data,
    };
  }

  public delete(id: Task['id']): AxiosRequestConfig {
    return {
      method: 'DELETE',
      url: `/tasks/${id}`,
    };
  }
}

export const taskApiService = new TaskApiService();
