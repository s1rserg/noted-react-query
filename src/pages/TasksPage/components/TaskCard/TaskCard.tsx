import { AccountCircle, CheckCircle, Delete, Edit, Info } from '@mui/icons-material';
import { AppRoutes } from 'routes/config';
import { ButtonsStyles, DescriptionStyles, PriorityStyles } from './styles';
import { ConfirmModal } from 'components/ConfirmModal';
import { generatePath, useNavigate } from 'react-router-dom';
import { StatusChip } from '../StatusChip';
import { TaskPriorityLabels } from '../../config';
import { useModal } from 'hooks';
import {
  Box,
  Card,
  CardContent,
  Chip,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import { type FC } from 'react';
import { TaskStatus, type Task } from 'types/task';
import { useTranslation } from 'react-i18next';

interface Props {
  task: Task;
  onEdit: (task: Task) => void;
  onComplete: (id: Task['id']) => Promise<void>;
  onDelete: (id: Task['id']) => Promise<void>;
}

export const TaskCard: FC<Props> = ({ task, onEdit, onComplete, onDelete }) => {
  const { t } = useTranslation('tasksPage');
  const navigate = useNavigate();

  const {
    isOpen: isCompleteModalOpen,
    openModal: openCompleteModal,
    closeModal: closeCompleteModal,
  } = useModal();

  const {
    isOpen: isDeleteModalOpen,
    openModal: openDeleteModal,
    closeModal: closeDeleteModal,
  } = useModal();

  const isCompleted = task.status === TaskStatus.COMPLETED;

  const handleEdit = () => {
    onEdit(task);
  };

  const handleDetails = (id: Task['id']) => {
    void navigate(generatePath(AppRoutes.TASK_DETAILS, { id }));
  };

  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <CardContent>
        <Stack direction="row" spacing={1} alignItems="center" mb={2}>
          <AccountCircle />
          <Typography variant="h5">{task.title}</Typography>
        </Stack>

        <Typography variant="body2" color="text.secondary" sx={DescriptionStyles}>
          {task.description}
        </Typography>

        <Stack direction="row" spacing={1}>
          <StatusChip status={task.status} />
          <Chip label={t(TaskPriorityLabels[task.priority])} sx={PriorityStyles[task.priority]} />
          {task.deadline && <Chip label={task.deadline} />}
        </Stack>
        <Stack direction="row" spacing={1} mt={1}>
          {task.tags?.map((tag) => (
            <Chip key={tag} label={tag} />
          ))}
        </Stack>
      </CardContent>

      <Box sx={ButtonsStyles}>
        <Tooltip title={t('task.edit')}>
          <IconButton onClick={handleEdit}>
            <Edit />
          </IconButton>
        </Tooltip>
        <Tooltip title={t('task.details')}>
          <IconButton onClick={() => handleDetails(task.id)}>
            <Info />
          </IconButton>
        </Tooltip>
        <Tooltip title={t('task.complete')}>
          <span>
            <IconButton onClick={openCompleteModal} disabled={isCompleted}>
              <CheckCircle />
            </IconButton>
          </span>
        </Tooltip>
        <Tooltip title={t('task.delete')}>
          <IconButton onClick={openDeleteModal}>
            <Delete />
          </IconButton>
        </Tooltip>
      </Box>
      <ConfirmModal
        open={isCompleteModalOpen}
        handleClose={closeCompleteModal}
        onConfirm={() => void onComplete(task.id)}
        title={t('complete.title')}
        confirmText={t('complete.confirm')}
        cancelText={t('complete.cancel')}
      >
        {t('complete.description')}
      </ConfirmModal>
      <ConfirmModal
        open={isDeleteModalOpen}
        handleClose={closeDeleteModal}
        onConfirm={() => void onDelete(task.id)}
        title={t('delete.title')}
        confirmText={t('delete.confirm')}
        cancelText={t('delete.cancel')}
      >
        {t('delete.description')}
      </ConfirmModal>
    </Card>
  );
};
