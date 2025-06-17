import React, { useState, useEffect } from 'react';
import {
  Box,
  Tooltip,
  Typography,
  IconButton,
  Popover,
  Card,
  CardContent,
  Grid,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { badgeService, Badge } from '../services/badgeService';
import { supabase, TABLES } from '../config/supabaseConfig';

interface UserTooltipProps {
  username: string;
  children: React.ReactNode;
}

const UserTooltip: React.FC<UserTooltipProps> = ({ username, children }) => {
  const [badges, setBadges] = useState<Badge[]>([]);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [createdAt, setCreatedAt] = useState<string | null>(null);

  useEffect(() => {
    const loadBadges = async () => {
      const userBadges = await badgeService.getUserBadges(username);
      setBadges(userBadges);
    };
    loadBadges();
  }, [username]);

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase
        .from(TABLES.USERS)
        .select('createdat')
        .eq('username', username)
        .single();
      if (!error && data) setCreatedAt(data.createdat);
    };
    fetchUser();
  }, [username]);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <Tooltip title="Xem huy hiệu">
        <Box onClick={handleClick} sx={{ cursor: 'pointer', display: 'inline-block' }}>
          {children}
        </Box>
      </Tooltip>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Card sx={{ minWidth: 260, maxWidth: 400, bgcolor: '#1a1a1a' }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              <Typography variant="h6" sx={{ color: '#fff' }}>
                {username}
              </Typography>
              <IconButton onClick={handleClose} size="small" sx={{ color: '#fff' }}>
                <CloseIcon />
              </IconButton>
            </Box>
            {createdAt && (
              <Typography sx={{ color: '#aaa', fontSize: '0.95rem', mb: 1 }}>
                Ngày đăng ký: {new Date(createdAt).toLocaleDateString('vi-VN')}
              </Typography>
            )}
            <Grid container spacing={2}>
              {badges.length === 0 ? (
                <Grid item xs={12}>
                  <Typography sx={{ color: '#aaa', textAlign: 'center', py: 2 }}>
                    Chưa có huy hiệu nào
                  </Typography>
                </Grid>
              ) : (
                badges.map((badge) => (
                  <Grid item xs={4} key={badge.id}>
                    <Tooltip title={badge.description} arrow>
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: 0.5,
                          p: 1,
                          border: '1px solid #333',
                          borderRadius: 1,
                          backgroundColor: '#222',
                          '&:hover': { backgroundColor: '#333' },
                          cursor: 'pointer',
                        }}
                      >
                        <img
                          src={badge.image_path}
                          alt={badge.name}
                          style={{ width: 40, height: 40 }}
                        />
                        <Typography
                          variant="body2"
                          sx={{ color: '#fff', textAlign: 'center', fontSize: '0.7rem', mt: 0.5 }}
                        >
                          {badge.name}
                        </Typography>
                      </Box>
                    </Tooltip>
                  </Grid>
                ))
              )}
            </Grid>
          </CardContent>
        </Card>
      </Popover>
    </>
  );
};

export default UserTooltip; 