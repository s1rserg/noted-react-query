import AddIcon from '@mui/icons-material/Add';
import { IconButton, Tooltip } from '@mui/material';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
  openModal: () => void;
}

export const AddTaskButton: FC<Props> = ({ openModal }) => {
  const { t } = useTranslation('tasksPage');
  return (
    <Tooltip title={t('add.title')}>
      <IconButton onClick={openModal} color="primary">
        <AddIcon />
      </IconButton>
    </Tooltip>
  );
};
