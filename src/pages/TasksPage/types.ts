import { SortBy, SortOrder } from 'api';
import type { ValueOf } from 'types/utils';

export const ViewMode = {
  LIST: 'list',
  GRID: 'grid',
} as const;

export type ViewModeValues = ValueOf<typeof ViewMode>;

export const QueryKeys = {
  SEARCH: 'q',
  SORT_BY: 'sortBy',
  SORT_ORDER: 'sortOrder',
  STATUS: 'status',
  PRIORITY: 'priority',
} as const;

export type SortOrderValues = ValueOf<typeof SortOrder>;
export type SortByValues = ValueOf<typeof SortBy>;

export const FilterSortDefaults = {
  SORT_BY: SortBy.CREATED_AT,
  SORT_ORDER: SortOrder.DESC,
  FILTER_ALL: 'all',
} as const;
