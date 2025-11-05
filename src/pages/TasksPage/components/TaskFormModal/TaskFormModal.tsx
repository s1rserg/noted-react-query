import { CommonModal } from 'components/CommonModal';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  DialogActions,
  DialogContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { useEffect, type FC } from 'react';
import { useTranslation } from 'react-i18next';
import { FormInput } from 'components/FormInput';
import { CreateTaskSchema, type CreateTaskDto } from 'api';
import type { Task } from 'types/task';
import { CreateTaskDefaultValues, TaskPriorityValues, TaskStatusValues } from './config';
import { TaskPriorityLabels, TaskStatusLabels } from '../../config';
import type { Nullable } from 'types/utils';

interface Props {
  open: boolean;
  handleClose: () => void;
  onSubmit: (taskData: CreateTaskDto) => Promise<void>;
  isLoading: boolean;
  initialData?: Nullable<Task>;
}

export const TaskFormModal: FC<Props> = ({
  open,
  handleClose,
  onSubmit,
  isLoading,
  initialData,
}) => {
  const { t } = useTranslation('tasksPage');

  const isEditMode = !!initialData;

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
    clearErrors,
  } = useForm<CreateTaskDto>({
    resolver: zodResolver(CreateTaskSchema),
    defaultValues: isEditMode ? initialData : CreateTaskDefaultValues,
    reValidateMode: 'onSubmit',
  });

  const handleFormSubmit = handleSubmit((data: CreateTaskDto) => {
    void onSubmit(data);
  });

  useEffect(() => {
    if (open) {
      if (isEditMode) {
        reset(initialData);
      } else {
        reset(CreateTaskDefaultValues);
      }
      clearErrors();
    }
  }, [open, reset, clearErrors, initialData, isEditMode]);

  return (
    <CommonModal
      open={open}
      handleClose={handleClose}
      title={isEditMode ? t('edit.title') : t('add.title')}
    >
      <Box component="form" onSubmit={(e) => void handleFormSubmit(e)}>
        <DialogContent>
          <FormInput
            control={control}
            clearErrors={clearErrors}
            name="title"
            label={t('add.labels.title')}
            fullWidth
            margin="normal"
            helperText={t(errors.title?.message || '')}
          />
          <FormInput
            control={control}
            clearErrors={clearErrors}
            name="description"
            label={t('add.labels.description')}
            fullWidth
            multiline
            margin="normal"
            helperText={t(errors.description?.message || '')}
          />
          <FormInput
            control={control}
            clearErrors={clearErrors}
            name="deadline"
            label={t('add.labels.deadline')}
            type="date"
            fullWidth
            margin="normal"
            slotProps={{
              inputLabel: { shrink: true },
            }}
            helperText={t(errors.deadline?.message || '')}
          />
          <Controller
            control={control}
            name="status"
            render={({ field }) => (
              <FormControl fullWidth margin="normal">
                <InputLabel id="status-select-label">{t('add.labels.status')}</InputLabel>
                <Select
                  {...field}
                  labelId="status-select-label"
                  label={t('add.labels.status')}
                  onFocus={() => clearErrors('status')}
                >
                  {TaskStatusValues.map((value) => (
                    <MenuItem key={value} value={value}>
                      {t(TaskStatusLabels[value])}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="priority"
            render={({ field }) => (
              <FormControl fullWidth margin="normal">
                <InputLabel id="priority-select-label">{t('add.labels.priority')}</InputLabel>
                <Select
                  {...field}
                  labelId="priority-select-label"
                  label={t('add.labels.priority')}
                  onFocus={() => clearErrors('priority')}
                >
                  {TaskPriorityValues.map((value) => (
                    <MenuItem key={value} value={value}>
                      {t(TaskPriorityLabels[value])}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="tags"
            render={({ field: { onChange, value, name } }) => (
              <Autocomplete
                multiple
                freeSolo
                options={[]}
                value={value}
                onChange={(_, newValue) => {
                  onChange(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    name={name}
                    label={t('add.labels.tags')}
                    margin="normal"
                    error={!!errors.tags}
                    helperText={errors.tags?.message}
                    onFocus={() => clearErrors('tags')}
                  />
                )}
              />
            )}
          />
        </DialogContent>

        <DialogActions sx={{ display: 'flex', justifyContent: 'space-between', px: 3, pb: 2 }}>
          <Button onClick={handleClose} variant="outlined">
            {t(isEditMode ? 'edit.buttons.cancel' : 'add.buttons.cancel')}
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={isLoading || (isEditMode && !isDirty)}
            startIcon={isLoading ? <CircularProgress size={20} /> : null}
          >
            {isLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              t(isEditMode ? 'edit.buttons.save' : 'add.buttons.create')
            )}
          </Button>
        </DialogActions>
      </Box>
    </CommonModal>
  );
};
