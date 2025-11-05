import { Box, Card, CardContent, Typography } from '@mui/material';
import { handleApiError, httpClient, taskApiService } from 'api';
import { Loader } from 'components/Loader';
import { type FC, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import type { Task } from 'types/task';
import type { Nullable } from 'types/utils';

export const TaskDetailsPage: FC = () => {
  const { t } = useTranslation('taskDetailsPage');

  const { id } = useParams<{ id: string }>();

  const [task, setTask] = useState<Nullable<Task>>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchTask = useCallback(
    async (signal?: AbortSignal) => {
      if (!id) return;
      setIsLoading(true);

      try {
        const requestConfig = taskApiService.findOne(id, signal);
        const response = await httpClient<Task>(requestConfig);
        setTask(response.data);
      } catch (error) {
        handleApiError(error);
      } finally {
        setIsLoading(false);
      }
    },
    [id],
  );

  useEffect(() => {
    const controller = new AbortController();
    void fetchTask(controller.signal);

    return () => {
      controller.abort();
    };
  }, [fetchTask]);

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
