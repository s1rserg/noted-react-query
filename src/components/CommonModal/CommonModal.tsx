import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Box, Divider, IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import type { FC, ReactNode } from 'react';

interface CommonModalProps {
  open: boolean;
  handleClose: () => void;
  title: string;
  children: ReactNode;
}

export const CommonModal: FC<CommonModalProps> = ({ open, handleClose, title, children }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      aria-labelledby="common-dialog-title"
      closeAfterTransition={false}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          pr: 1,
        }}
      >
        <DialogTitle id="common-dialog-title">{title}</DialogTitle>
        <IconButton aria-label="close" onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider />
      {children}
    </Dialog>
  );
};
