import { Box, Card, CardContent, Typography } from '@mui/material';
import { Loader } from 'components/Loader';
import { type FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useGetOneTask } from './hooks';

export const TaskDetailsPage: FC = () => {
  const { t } = useTranslation('taskDetailsPage');
  const { id } = useParams<{ id: string }>();

  const { task, isLoading } = useGetOneTask(id || '');

  if (isLoading) {
    return <Loader />;
  }

  if (!task) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
        <Typography color="text.secondary">{t('notFoundMsg')}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
      <Card sx={{ width: '100%', maxWidth: 700, p: 2, borderRadius: 3, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            {t('title')}
          </Typography>
          <Box
            component="pre"
            sx={{
              borderRadius: 2,
              p: 2,
              fontFamily: 'monospace',
            }}
          >
            {JSON.stringify(task, null, 2)}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};
