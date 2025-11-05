import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { Nullable } from 'types/utils';

export const useQueryString = <T extends string>(key: string, defaultValue: T = '' as T) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const value = (searchParams.get(key) as T) ?? defaultValue;

  const setValue = useCallback(
    (newValue: Nullable<T>) => {
      const currentParams = new URLSearchParams(window.location.search);

      if (newValue === null || newValue === '' || newValue === defaultValue) {
        currentParams.delete(key);
      } else {
        currentParams.set(key, newValue);
      }

      setSearchParams(currentParams);
    },
    [key, defaultValue, setSearchParams],
  );

  return [value, setValue] as const;
};
