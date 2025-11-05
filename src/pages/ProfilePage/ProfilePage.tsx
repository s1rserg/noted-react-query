import { Box } from '@mui/material';
import { Loader } from 'components/Loader';
import { useEffect, useState, type FC } from 'react';
import { useUserStore } from 'store';
import { useModal } from 'hooks';
import {
  handleApiError,
  httpClient,
  userApiService,
  type UpdateUserDto,
  type User,
  type UserAvatarMedia,
} from 'api';
import { useTranslation } from 'react-i18next';
import { AvatarSlider, UploadAvatarModal, UserData, UpdateProfileModal } from './components';
import { toast } from 'react-toastify';

export const ProfilePage: FC = () => {
  const { t } = useTranslation('profilePage');

  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const initUser = useUserStore((state) => state.initUser);
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

  const [allAvatars, setAllAvatars] = useState<UserAvatarMedia[]>([]);
  const [areAvatarsLoading, setAreAvatarsLoading] = useState(true);
  const [isUpdateLoading, setIsUpdateLoading] = useState(false);

  const fetchAvatars = async (signal?: AbortSignal) => {
    setAreAvatarsLoading(true);
    try {
      const config = userApiService.getAllAvatars(signal);
      const response = await httpClient<UserAvatarMedia[]>(config);
      setAllAvatars(response.data);
    } catch (error) {
      handleApiError(error);
    } finally {
      setAreAvatarsLoading(false);
    }
  };

  const handleUpdateUserSubmit = async (data: UpdateUserDto): Promise<boolean> => {
    setIsUpdateLoading(true);
    try {
      const updatedUser = (await httpClient<User>(userApiService.updateProfile(data))).data;
      setUser({ ...user, ...updatedUser });
      toast.success(t('updateModal.successMsg'));
      closeUpdateModal();
      return true;
    } catch (error) {
      handleApiError(error);
      return false;
    } finally {
      setIsUpdateLoading(false);
    }
  };

  const handleUploadAvatar = async (file: File): Promise<void> => {
    try {
      const avatar = (await httpClient<UserAvatarMedia>(userApiService.uploadAvatar(file))).data;
      if (!user) return;
      setUser({ ...user, avatar });
      await fetchAvatars();
      closeUploadModal();
    } catch (error) {
      handleApiError(error);
    }
  };

  const handleSetMainAvatar = async (mediaId: UserAvatarMedia['id']) => {
    try {
      const avatar = (await httpClient<UserAvatarMedia>(userApiService.setMainAvatar(mediaId)))
        .data;
      if (!user) return;
      setUser({ ...user, avatar });
    } catch (error) {
      handleApiError(error);
    }
  };

  const handleDeleteAvatar = async (mediaId: UserAvatarMedia['id']) => {
    try {
      await httpClient(userApiService.deleteAvatar(mediaId));
      await initUser();
      setAllAvatars((prev) => prev.filter((avatar) => avatar.id !== mediaId));
    } catch (error) {
      handleApiError(error);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    void fetchAvatars(controller.signal);

    return () => controller.abort();
  }, []);

  if (!user || areAvatarsLoading) {
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
