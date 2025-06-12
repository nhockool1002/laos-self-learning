import React, { ReactElement, useEffect, useState } from 'react';
import {
  Tooltip,
  Box,
  Typography,
  Divider,
  IconButton,
  Stack,
} from '@mui/material';
import {
  Settings as SettingsIcon,
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { badgeService, Badge } from '../services/badgeService';

interface UserTooltipProps {
  username: string;
  children: ReactElement;
}

const BadgeWithTooltip: React.FC<{ badge: Badge }> = ({ badge }) => (
  <Tooltip
    title={
      <Box sx={{ p: 1 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
          {badge.name}
        </Typography>
        <Typography variant="body2">
          {badge.description}
        </Typography>
      </Box>
    }
    arrow
    placement="top"
  >
    <Box sx={{ cursor: 'pointer' }}>
      <img 
        src={badge.imagePath} 
        alt={badge.name}
        style={{ width: 24, height: 24 }}
      />
    </Box>
  </Tooltip>
);

const UserTooltip: React.FC<UserTooltipProps> = ({ username, children }) => {
  const { currentUser } = useAuth();
  const [userBadges, setUserBadges] = useState<Badge[]>([]);

  useEffect(() => {
    const fetchUserBadges = async () => {
      if (currentUser) {
        const badges = await badgeService.getUserBadges(currentUser.username);
        setUserBadges(badges);
      }
    };
    fetchUserBadges();
  }, [currentUser]);

  return (
    <Tooltip
      title={
        <Box sx={{ p: 1, minWidth: 200 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
            {username}
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Huy hiệu:
          </Typography>
          <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
            {userBadges.map((badge) => (
              <BadgeWithTooltip key={badge.id} badge={badge} />
            ))}
          </Stack>
          <Divider sx={{ my: 1 }} />
          <IconButton size="small" sx={{ color: 'inherit' }}>
            <SettingsIcon fontSize="small" />
            <Typography variant="body2" sx={{ ml: 0.5 }}>
              Cài đặt
            </Typography>
          </IconButton>
        </Box>
      }
      arrow
      placement="bottom"
    >
      {children}
    </Tooltip>
  );
};

export default UserTooltip; 