import type { SxProps } from '@mui/material';

export const overlayStyles: SxProps = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  p: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  background: 'rgba(0,0,0,0.35)',
  backdropFilter: 'blur(8px)',
  color: 'white',
};

export const navigationArrowsStyles: SxProps = {
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  background: 'rgba(0,0,0,0.4)',
  backdropFilter: 'blur(6px)',
  color: 'white',
  '&:hover': { background: 'rgba(0,0,0,0.6)' },
};
