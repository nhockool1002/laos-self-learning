import React, { useState } from 'react';
import { IconButton, Tooltip, Box } from '@mui/material';
import { Person as PersonIcon, Logout as LogoutIcon } from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { LoginModal } from './LoginModal';

export const LoginButton: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isAuthenticated, currentUser, logout } = useAuth();

  if (isAuthenticated && currentUser) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Tooltip title="Đăng xuất">
          <IconButton color="inherit" onClick={logout}>
            <LogoutIcon />
          </IconButton>
        </Tooltip>
      </Box>
    );
  }

  return (
    <>
      <Tooltip title="Đăng nhập">
        <IconButton
          color="inherit"
          onClick={() => setIsModalOpen(true)}
          sx={{ ml: 1 }}
        >
          <PersonIcon />
        </IconButton>
      </Tooltip>
      <LoginModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}; 