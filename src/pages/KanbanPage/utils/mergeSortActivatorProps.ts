import type { SortActivatorProps } from '../types';

export const mergeSortActivatorProps = (sortActivatorProps?: SortActivatorProps) => {
  if (!sortActivatorProps) return {};

  const { listeners = {}, ref, attributes } = sortActivatorProps;

  return {
    ref,
    ...listeners,
    ...attributes,
  };
};
