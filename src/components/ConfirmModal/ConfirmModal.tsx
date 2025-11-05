import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { CommonModal } from '../CommonModal';
import type { FC, ReactNode } from 'react';

interface ConfirmModalProps {
  open: boolean;
  handleClose: () => void;
  onConfirm: () => void;
  title: string;
  children: ReactNode;
  confirmText?: string;
  cancelText?: string;
}

export const ConfirmModal: FC<ConfirmModalProps> = ({
  open,
  handleClose,
  onConfirm,
  title,
  children,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
}) => {
  const handleConfirmClick = () => {
    onConfirm();
    handleClose();
  };

  return (
    <CommonModal open={open} handleClose={handleClose} title={title}>
      <DialogContent>
        <DialogContentText>{children}</DialogContentText>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={handleClose} variant="outlined">
          {cancelText}
        </Button>
        <Button onClick={handleConfirmClick} variant="contained">
          {confirmText}
        </Button>
      </DialogActions>
    </CommonModal>
  );
};
