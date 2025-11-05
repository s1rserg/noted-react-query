import { FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import { PriorityFilterOptions, StatusFilterOptions } from './config';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import type { StatusFilterValues, PriorityFilterValues } from 'api';

interface Props {
  statusFilter: StatusFilterValues;
  setStatusFilter: (value: StatusFilterValues) => void;
  priorityFilter: PriorityFilterValues;
  setPriorityFilter: (value: PriorityFilterValues) => void;
}

export const FilterControls: FC<Props> = ({
  statusFilter,
  setStatusFilter,
  priorityFilter,
  setPriorityFilter,
}) => {
  const { t } = useTranslation('tasksPage');

  return (
    <>
      <Typography sx={{ pt: 1 }}>{t('header.filters.title')}</Typography>
      <FormControl size="small" fullWidth>
        <InputLabel>{t('header.filters.status')}</InputLabel>
        <Select
          value={statusFilter}
          label={t('header.filters.status')}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          {StatusFilterOptions.map((opt) => (
            <MenuItem key={opt.value} value={opt.value}>
              {t(opt.label)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl size="small" fullWidth>
        <InputLabel>{t('header.filters.priority')}</InputLabel>
        <Select
          value={priorityFilter}
          label={t('header.filters.priority')}
          onChange={(e) => setPriorityFilter(e.target.value)}
        >
          {PriorityFilterOptions.map((opt) => (
            <MenuItem key={opt.value} value={opt.value}>
              {t(opt.label)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};
