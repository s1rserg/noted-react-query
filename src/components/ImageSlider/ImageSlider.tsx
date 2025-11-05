import { type FC, type ReactNode } from 'react';
import { Box, IconButton, Paper } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import type { SliderItem } from './types';
import { navigationArrowsStyles, overlayStyles } from './styles';

interface Props {
  items: SliderItem[];
  currentIndex: number;
  onIndexChange: (newIndex: number) => void;
  overlay?: ReactNode;
  placeholder?: ReactNode;
}

export const ImageSlider: FC<Props> = ({
  items,
  currentIndex,
  onIndexChange,
  overlay,
  placeholder,
}) => {
  const handlePrev = () => {
    onIndexChange(currentIndex === 0 ? items.length - 1 : currentIndex - 1);
  };

  const handleNext = () => {
    onIndexChange(currentIndex === items.length - 1 ? 0 : currentIndex + 1);
  };

  const currentItem = items[currentIndex];

  if (items.length === 0) {
    return (
      <Paper
        sx={{
          width: '100%',
          maxWidth: 330,
          height: 'auto',
          aspectRatio: '1 / 1',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 2,
          overflow: 'hidden',
        }}
      >
        {placeholder}
      </Paper>
    );
  }

  return (
    <Paper
      sx={{
        width: '100%',
        maxWidth: 330,
        height: 'auto',
        aspectRatio: '1 / 1',
        position: 'relative',
        borderRadius: 2,
        overflow: 'hidden',
      }}
    >
      {currentItem && (
        <Box
          component="img"
          src={currentItem.url}
          alt={currentItem.altText}
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      )}

      {overlay && <Box sx={overlayStyles}>{overlay}</Box>}

      <IconButton onClick={handlePrev} sx={{ ...navigationArrowsStyles, left: 6 }}>
        <ChevronLeft />
      </IconButton>

      <IconButton onClick={handleNext} sx={{ ...navigationArrowsStyles, right: 6 }}>
        <ChevronRight />
      </IconButton>
    </Paper>
  );
};
