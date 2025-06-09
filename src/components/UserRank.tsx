import React, { useEffect, useState } from 'react';
import { Box, Typography, keyframes } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { sheetService } from '../services/sheetService';

const rainbowAnimation1 = keyframes`
  0% { color: #ff0000; }
  17% { color: #ff8000; }
  33% { color: #ffff00; }
  50% { color: #00ff00; }
  67% { color: #0000ff; }
  83% { color: #8000ff; }
  100% { color: #ff0000; }
`;

const rainbowAnimation2 = keyframes`
  0% { color: #b0b0b0; }
  20% { color: #e0e0e0; }
  40% { color: #f8f8ff; }
  60% { color: #b0c4de; }
  80% { color: #dcdcdc; }
  100% { color: #b0b0b0; }
`;

const rainbowAnimation3 = keyframes`
  0% { color: #ffd700; }
  20% { color: #fff8dc; }
  40% { color: #ffe066; }
  60% { color: #ffcc00; }
  80% { color: #fff700; }
  100% { color: #ffd700; }
`;

const rainbowAnimation4 = keyframes`
  0% { color: #1e90ff; }
  17% { color: #4169e1; }
  33% { color: #6495ed; }
  50% { color: #87ceeb; }
  67% { color: #6495ed; }
  83% { color: #4169e1; }
  100% { color: #1e90ff; }
`;

export const UserRankInline: React.FC<{ username: string; rank: number }> = ({ username, rank }) => {
  const getMedalAndAnimation = () => {
    if (rank === 1) {
      return {
        medal: '/medal1.png',
        animation: rainbowAnimation1
      };
    } else if (rank === 2) {
      return {
        medal: '/medal2.png',
        animation: rainbowAnimation2
      };
    } else if (rank === 3) {
      return {
        medal: '/medal3.png',
        animation: rainbowAnimation3
      };
    } else if (rank >= 4 && rank <= 10) {
      return {
        medal: '/medal4.png',
        animation: rainbowAnimation4
      };
    }
    return null;
  };
  const medalInfo = getMedalAndAnimation();
  if (!medalInfo) {
    return <Typography sx={{ fontWeight: 'bold' }}>{username}</Typography>;
  }
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <img 
        src={medalInfo.medal} 
        alt={`Rank ${rank}`} 
        style={{ width: 20, height: 20 }}
      />
      <Typography
        sx={{
          animation: `${medalInfo.animation} 2s linear infinite`,
          fontWeight: 'bold'
        }}
      >
        {username}
      </Typography>
    </Box>
  );
};

export const UserRank: React.FC = () => {
  const { currentUser } = useAuth();
  const [userRank, setUserRank] = useState<number | null>(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      if (currentUser) {
        try {
          const records = await sheetService.getLeaderboard();
          const rank = records.findIndex(record => record.username === currentUser.username) + 1;
          setUserRank(rank > 0 ? rank : null);
        } catch (error) {
          console.error('Error fetching leaderboard:', error);
        }
      }
    };
    fetchLeaderboard();
  }, [currentUser]);

  if (!currentUser) return null;

  // Nếu không có xếp hạng hoặc ngoài top 10, chỉ hiển thị username bình thường
  if (!userRank || userRank > 10) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography sx={{ fontWeight: 'bold', display: { xs: 'none', sm: 'block' } }}>
          {currentUser.username}
        </Typography>
      </Box>
    );
  }

  const getMedalAndAnimation = () => {
    if (userRank === 1) {
      return {
        medal: '/medal1.png',
        animation: rainbowAnimation1
      };
    } else if (userRank === 2) {
      return {
        medal: '/medal2.png',
        animation: rainbowAnimation2
      };
    } else if (userRank === 3) {
      return {
        medal: '/medal3.png',
        animation: rainbowAnimation3
      };
    } else if (userRank >= 4 && userRank <= 10) {
      return {
        medal: '/medal4.png',
        animation: rainbowAnimation4
      };
    }
    return null;
  };

  const medalInfo = getMedalAndAnimation();
  if (!medalInfo) return null;

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <img 
        src={medalInfo.medal} 
        alt={`Rank ${userRank}`} 
        style={{ width: 24, height: 24, display: 'inline-block' }}
      />
      <Typography
        sx={{
          animation: `${medalInfo.animation} 2s linear infinite`,
          fontWeight: 'bold',
          display: { xs: 'none', sm: 'block' }
        }}
      >
        {currentUser.username}
      </Typography>
    </Box>
  );
}; 