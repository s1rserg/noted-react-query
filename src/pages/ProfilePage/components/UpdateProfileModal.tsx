import { type FC } from 'react';
import { UpdateUserDataForm } from 'components/UpdateUserDataForm';
import { type UpdateUserDto, type User } from 'api';
import { useTranslation } from 'react-i18next';
import { CommonModal } from 'components/CommonModal';
import { Box } from '@mui/material';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: UpdateUserDto) => Promise<boolean>;
  user: User;
  isLoading: boolean;
}
export const UpdateProfileModal: FC<Props> = ({ isOpen, onClose, onSubmit, isLoading, user }) => {
  const { t } = useTranslation('profilePage');

  const initialData: Partial<UpdateUserDto> = {
    name: user.name ?? '',
    surname: user.surname ?? '',
    birthday: user.birthday ? user.birthday.split('T')[0] : undefined,
  };

  return (
    <CommonModal open={isOpen} handleClose={onClose} title={t('updateModal.title')}>
      <Box px={4} pb={4} sx={{ width: { xs: 'auto', sm: 500 } }}>
        <UpdateUserDataForm
          onSubmit={onSubmit}
          onCancel={onClose}
          isLoading={isLoading}
          initialData={initialData}
          submitButtonText={t('updateModal.buttons.save')}
          cancelButtonText={t('updateModal.buttons.cancel')}
        />
      </Box>
    </CommonModal>
  );
};
