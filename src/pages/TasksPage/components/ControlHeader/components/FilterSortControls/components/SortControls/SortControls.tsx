import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { SortOptions } from './config';
import {
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tooltip,
  IconButton,
} from '@mui/material';
import { type SortByValues, type SortOrderValues } from 'pages/TasksPage/types';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { SortOrder } from 'api';

interface Props {
  sortBy: SortByValues;
  setSortBy: (value: SortByValues) => void;
  sortOrder: SortOrderValues;
  setSortOrder: (value: SortOrderValues) => void;
}

export const SortControls: FC<Props> = ({ sortBy, setSortBy, sortOrder, setSortOrder }) => {
  const { t } = useTranslation('tasksPage');

  const isAscSortOrder = sortOrder === SortOrder.ASC;

  return (
    <>
      <Typography variant="subtitle1">{t('header.sort.title')}</Typography>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <FormControl size="small" fullWidth>
          <InputLabel>{t('header.sort.field')}</InputLabel>
          <Select
            value={sortBy}
            label={t('header.sort.field')}
            onChange={(e) => setSortBy(e.target.value as SortByValues)}
          >
            {SortOptions.map((opt) => (
              <MenuItem key={opt.value} value={opt.value}>
                {t(opt.label)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Tooltip title={isAscSortOrder ? t('header.sort.asc') : t('header.sort.desc')}>
          <IconButton onClick={() => setSortOrder(isAscSortOrder ? SortOrder.DESC : SortOrder.ASC)}>
            {isAscSortOrder ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
          </IconButton>
        </Tooltip>
      </Box>
    </>
  );
};
