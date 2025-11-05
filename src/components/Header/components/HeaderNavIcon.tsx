import { IconButton, Tooltip } from '@mui/material';
import ViewKanbanIcon from '@mui/icons-material/ViewKanban';
import type { FC } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AppRoutes } from 'routes';
import { useUserStore } from 'store';
import ListAltIcon from '@mui/icons-material/ListAlt';

export const HeaderNavIcon: FC = () => {
  const { t } = useTranslation('header');
  const user = useUserStore((state) => state.user);
  const location = useLocation();

  if (!user) return null;

  const isOnKanban = location.pathname === AppRoutes.KANBAN;

  const to = isOnKanban ? AppRoutes.TASKS : AppRoutes.KANBAN;
  const tooltip = isOnKanban ? t('buttons.backToTasks') : t('buttons.kanbanView');

  return (
    <Tooltip title={tooltip}>
      <IconButton component={Link} to={to} size="large">
        {isOnKanban ? <ListAltIcon /> : <ViewKanbanIcon />}
      </IconButton>
    </Tooltip>
  );
};
