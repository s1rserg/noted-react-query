import { Box } from '@mui/material';
import { Loader } from 'components/Loader';
import { type FC } from 'react';
import { useGetUser, useModal, useUpdateProfileMutation } from 'hooks';
import { type UpdateUserDto, type UserAvatarMedia } from 'api';
import { AvatarSlider, UploadAvatarModal, UserData, UpdateProfileModal } from './components';
import {
  useDeleteAvatarMutation,
  useGetAllAvatars,
  useSetMainAvatarMutation,
  useUploadAvatarMutation,
} from './hooks';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

export const ProfilePage: FC = () => {
  const { t } = useTranslation('profilePage');

  const { data: user, isLoading: isUserLoading } = useGetUser();
  const { data: allAvatars = [], isLoading: areAvatarsLoading } = useGetAllAvatars();

  const {
    isOpen: isUploadModalOpen,
    openModal: openUploadModal,
    closeModal: closeUploadModal,
  } = useModal();
  const {
    isOpen: isUpdateModalOpen,
    openModal: openUpdateModal,
    closeModal: closeUpdateModal,
  } = useModal();

  const { mutateAsync: updateUser, isPending: isUpdateLoading } = useUpdateProfileMutation();
  const { mutateAsync: uploadAvatar } = useUploadAvatarMutation();

  const { mutate: setMainAvatar, isPending: isSettingMain } = useSetMainAvatarMutation();
  const { mutate: deleteAvatar, isPending: isDeleting } = useDeleteAvatarMutation();

  const handleUpdateUserSubmit = async (data: UpdateUserDto): Promise<boolean> => {
    try {
      await updateUser(data);
      closeUpdateModal();
      toast.success(t('updateModal.successMsg'));
      return true;
    } catch (_error) {
      return false;
    }
  };

  const handleUploadAvatar = async (file: File) => {
    try {
      await uploadAvatar(file);
      closeUploadModal();
    } catch (_error) {
      /* empty */
    }
  };

  const handleSetMainAvatar = (mediaId: UserAvatarMedia['id']) => {
    setMainAvatar(mediaId);
  };

  const handleDeleteAvatar = (mediaId: UserAvatarMedia['id']) => {
    deleteAvatar(mediaId);
  };

  if (isUserLoading || areAvatarsLoading || !user) {
    return <Loader />;
  }

  return (
    <>
      <Box p={4} display="flex" justifyContent="center" alignItems="center" gap={4} flexWrap="wrap">
        <AvatarSlider
          avatars={allAvatars}
          mainAvatarId={user.avatar?.id ?? null}
          onUpload={openUploadModal}
          onSetMain={handleSetMainAvatar}
          onDelete={handleDeleteAvatar}
          isLoading={isSettingMain || isDeleting}
        />
        <UserData user={user} openUpdateModal={openUpdateModal} />
      </Box>

      <UploadAvatarModal
        isOpen={isUploadModalOpen}
        onClose={closeUploadModal}
        onUpload={handleUploadAvatar}
      />
      <UpdateProfileModal
        isOpen={isUpdateModalOpen}
        onClose={closeUpdateModal}
        onSubmit={handleUpdateUserSubmit}
        isLoading={isUpdateLoading}
        user={user}
      />
    </>
  );
};
