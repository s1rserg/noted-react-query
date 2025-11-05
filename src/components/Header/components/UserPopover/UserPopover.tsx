import {
  Avatar,
  Badge,
  Box,
  IconButton,
  Popover,
  Tooltip,
  Stack,
  Typography,
  Button,
  Divider,
} from '@mui/material';
import { useState, type FC, type MouseEvent } from 'react';
import type { Nullable } from 'types/utils';
import { useUserStore } from 'store';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from 'routes';
import { useTranslation } from 'react-i18next';

export const UserPopover: FC = () => {
  const { t } = useTranslation('header');

  const user = useUserStore((state) => state.user);
  const logout = useUserStore((state) => state.logout);

  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState<Nullable<HTMLElement>>(null);

  if (!user) return null;

  const open = Boolean(anchorEl);

  const emptyProfile = user && !user.name;

  const handleClick = (event: MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleLogout = async () => {
    handleClose();
    await logout();
    void navigate(AppRoutes.LOGIN, { replace: true });
  };

  const handleClickUpdateProfile = () => {
    handleClose();
    void navigate(AppRoutes.PROFILE);
  };
  return (
    <>
      <Tooltip title={t('buttons.profile')}>
        <span>
          <IconButton onClick={handleClick} disabled={!user}>
            <Badge variant="dot" color="secondary" overlap="circular" invisible={!emptyProfile}>
              <Avatar src={user.avatar?.secureUrl || ''} />
            </Badge>
          </IconButton>
        </span>
      </Tooltip>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Box sx={{ p: 2, width: 280 }}>
          {user && (
            <Stack spacing={1}>
              <Box>
                <Typography variant="subtitle1" component="p">
                  {t('hello')}, {user.name || user.email}
                </Typography>

                {emptyProfile && (
                  <Typography variant="subtitle1" component="p">
                    {t('updateProfile')}
                  </Typography>
                )}
              </Box>

              <Divider />

              <Button variant="outlined" fullWidth onClick={handleClickUpdateProfile}>
                {t('buttons.profile')}
              </Button>

              <Button
                variant="contained"
                color="error"
                fullWidth
                onClick={() => void handleLogout()}
              >
                {t('buttons.logout')}
              </Button>
            </Stack>
          )}
        </Box>
      </Popover>
    </>
  );
};
