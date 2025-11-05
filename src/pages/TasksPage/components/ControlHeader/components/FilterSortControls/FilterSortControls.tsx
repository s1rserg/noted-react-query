import TuneIcon from '@mui/icons-material/Tune';
import { Badge, Box, Button, IconButton, Popover, Stack, Tooltip } from '@mui/material';
import { FilterControls, SortControls } from './components';
import { type FC, type MouseEvent, useState } from 'react';
import { FilterSortDefaults, type SortByValues, type SortOrderValues } from '../../../../types';
import type { Nullable } from 'types/utils';
import { useTranslation } from 'react-i18next';
import type { PriorityFilterValues, StatusFilterValues } from 'api';

interface Props {
  sortBy: SortByValues;
  setSortBy: (value: SortByValues) => void;
  sortOrder: SortOrderValues;
  setSortOrder: (value: SortOrderValues) => void;
  statusFilter: StatusFilterValues;
  setStatusFilter: (value: StatusFilterValues) => void;
  priorityFilter: PriorityFilterValues;
  setPriorityFilter: (value: PriorityFilterValues) => void;
}

export const FilterSortControls: FC<Props> = ({
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
  statusFilter,
  setStatusFilter,
  priorityFilter,
  setPriorityFilter,
}) => {
  const { t } = useTranslation('tasksPage');
  const [anchorEl, setAnchorEl] = useState<Nullable<HTMLElement>>(null);

  const handleClick = (event: MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleResetFilters = () => {
    setSortBy(FilterSortDefaults.SORT_BY);
    setSortOrder(FilterSortDefaults.SORT_ORDER);
    setStatusFilter(FilterSortDefaults.FILTER_ALL);
    setPriorityFilter(FilterSortDefaults.FILTER_ALL);
    handleClose();
  };

  const isFilterApplied =
    statusFilter !== FilterSortDefaults.FILTER_ALL ||
    priorityFilter !== FilterSortDefaults.FILTER_ALL;
  const open = Boolean(anchorEl);

  return (
    <>
      <Tooltip title={t('header.filterSort.title')}>
        <IconButton onClick={handleClick} sx={{ color: 'primary.main' }}>
          <Badge color="secondary" variant="dot" invisible={!isFilterApplied}>
            <TuneIcon />
          </Badge>
        </IconButton>
      </Tooltip>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Box sx={{ p: 2, width: 280 }}>
          <Stack spacing={2}>
            <SortControls
              sortBy={sortBy}
              setSortBy={setSortBy}
              sortOrder={sortOrder}
              setSortOrder={setSortOrder}
            />

            <FilterControls
              statusFilter={statusFilter}
              priorityFilter={priorityFilter}
              setStatusFilter={setStatusFilter}
              setPriorityFilter={setPriorityFilter}
            />

            <Button onClick={handleResetFilters} fullWidth sx={{ mt: 1 }} variant="outlined">
              {t('header.filterSort.reset')}
            </Button>
          </Stack>
        </Box>
      </Popover>
    </>
  );
};
