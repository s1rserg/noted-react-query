import { type FC } from 'react';
import { Stack, Typography, IconButton, Tooltip } from '@mui/material';
import { AddPhotoAlternate, DeleteOutline, CheckCircleOutline } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import type { SliderItem } from 'components/ImageSlider';

interface Props {
  currentIndex: number;
  sliderItems: SliderItem[];
  isMainAvatar: boolean;
  isLoading: boolean;
  onUpload: () => void;
  onSetMain: () => Promise<void>;
  onDelete: () => Promise<void>;
}

export const AvatarOverlay: FC<Props> = ({
  onUpload,
  onDelete,
  onSetMain,
  isMainAvatar,
  currentIndex,
  sliderItems,
  isLoading,
}) => {
  const { t } = useTranslation('profilePage');

  const currentItem = sliderItems[currentIndex];

  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between" width="100%">
      <Stack direction="row" spacing={0.5}>
        <Tooltip title={t('slider.add') || ''}>
          <IconButton size="small" onClick={onUpload} disabled={isLoading} sx={{ color: 'white' }}>
            <AddPhotoAlternate fontSize="small" />
          </IconButton>
        </Tooltip>

        <Tooltip title={t('slider.delete') || ''}>
          <IconButton
            size="small"
            onClick={() => void onDelete()}
            disabled={isLoading}
            sx={{ color: 'white' }}
          >
            <DeleteOutline fontSize="small" />
          </IconButton>
        </Tooltip>

        <Tooltip title={t('slider.setMain') || ''}>
          <span>
            <IconButton
              size="small"
              onClick={() => void onSetMain()}
              disabled={isMainAvatar || isLoading}
              color={isMainAvatar ? 'primary' : 'default'}
              sx={{ color: isMainAvatar ? 'primary.main' : 'white' }}
            >
              <CheckCircleOutline fontSize="small" />
            </IconButton>
          </span>
        </Tooltip>
      </Stack>

      {currentItem && (
        <Typography variant="caption">
          {new Date(currentItem.createdAt).toLocaleDateString()}
        </Typography>
      )}

      <Typography variant="body2">
        {sliderItems.length ? `${currentIndex + 1} / ${sliderItems.length}` : '-'}
      </Typography>
    </Stack>
  );
};
