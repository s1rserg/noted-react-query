import { Paper, Stack, Typography, Button } from '@mui/material';
import type { User } from 'api';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

export interface Props {
  user: User;
  openUpdateModal: () => void;
}

export const UserData: FC<Props> = ({ user, openUpdateModal }) => {
  const { t } = useTranslation('profilePage');

  return (
    <Paper sx={{ width: 400, p: 3 }}>
      <Stack spacing={2}>
        <Typography variant="h5">{t('title')}</Typography>
        <Typography>
          <strong>{t('labels.email')}: </strong> {user.email}
        </Typography>
        <Typography>
          <strong>{t('labels.name')}: </strong> {user.name ?? '-'}
        </Typography>
        <Typography>
          <strong>{t('labels.surname')}: </strong> {user.surname ?? '-'}
        </Typography>
        <Typography>
          <strong>{t('labels.birthday')}: </strong>
          {user.birthday ? new Date(user.birthday).toISOString().split('T')[0] : '-'}
        </Typography>
        <Typography>
          <strong>{t('labels.joined')}: </strong>
          {new Date(user.createdAt).toISOString().split('T')[0]}
        </Typography>
        <Button variant="contained" onClick={openUpdateModal}>
          {t('buttons.edit')}
        </Button>
      </Stack>
    </Paper>
  );
};
