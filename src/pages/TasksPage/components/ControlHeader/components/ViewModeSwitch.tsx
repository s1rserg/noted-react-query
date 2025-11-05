import GridViewIcon from '@mui/icons-material/GridView';
import ViewListIcon from '@mui/icons-material/ViewList';
import { IconButton, Tooltip } from '@mui/material';
import { ViewMode, type ViewModeValues } from '../../../types';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
  viewMode: ViewModeValues;
  onToggle: () => void;
}

export const ViewModeSwitch: FC<Props> = ({ viewMode, onToggle }) => {
  const { t } = useTranslation('tasksPage');

  const nextViewMode = viewMode === ViewMode.GRID ? ViewMode.LIST : ViewMode.GRID;
  const nextViewModeLabel = t(nextViewMode === ViewMode.LIST ? 'viewMode.list' : 'viewMode.grid');
  const tooltipTitle = t('header.viewModeSwitch.title', {
    viewMode: nextViewModeLabel,
  });

  return (
    <Tooltip title={tooltipTitle}>
      <IconButton onClick={onToggle} color="primary" size="large">
        {viewMode === ViewMode.GRID ? <ViewListIcon /> : <GridViewIcon />}
      </IconButton>
    </Tooltip>
  );
};
