import React, { useState } from 'react';
import { IconButton, Tooltip, Typography, Box } from '@mui/material';
import { Person as PersonIcon, Logout as LogoutIcon } from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { LoginModal } from './LoginModal';

export const LoginButton: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isAuthenticated, currentUser, logout } = useAuth();

  if (isAuthenticated && currentUser) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 'bold',
            color: '#ffd700',
            textShadow: '0 0 4px #fff, 0 0 8px #ffd700',
            letterSpacing: 1,
            mr: 1,
          }}
        >
          {currentUser.username}
        </Typography>
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