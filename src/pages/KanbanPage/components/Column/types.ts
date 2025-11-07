import type { InfiniteData, UseInfiniteQueryResult } from '@tanstack/react-query';
import type { TaskCursorResponse } from 'api';

export type ColumnQuery = UseInfiniteQueryResult<InfiniteData<TaskCursorResponse, unknown>, Error>;
