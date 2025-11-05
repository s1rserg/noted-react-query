import { type FC } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { AddPhotoAlternate } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

interface Props {
  isLoading: boolean;
  onUpload: () => void;
}

export const AvatarPlaceholder: FC<Props> = ({ onUpload, isLoading }) => {
  const { t } = useTranslation('profilePage');
  return (
    <Tooltip title={t('slider.add') || ''}>
      <IconButton onClick={onUpload} disabled={isLoading}>
        <AddPhotoAlternate fontSize="large" />
      </IconButton>
    </Tooltip>
  );
};
