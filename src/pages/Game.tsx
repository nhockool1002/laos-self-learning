import React, { useState, useEffect } from 'react';
import { Box, Tabs, Tab, Typography, Paper, Divider, CircularProgress, Alert } from '@mui/material';
import { getGameGroups, getFlashGamesByGroupId } from '../services/gameService';

function TabPanel(props: { children?: React.ReactNode; index: number; value: number }) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`game-tabpanel-${index}`}
      aria-labelledby={`game-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const Game: React.FC = () => {
  const [tab, setTab] = useState(0);
  const [groups, setGroups] = useState<any[]>([]);
  const [games, setGames] = useState<Record<string, any[]>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        const groupList = await getGameGroups();
        setGroups(groupList);
        // Fetch all games for all groups in parallel
        const gamesByGroup: Record<string, any[]> = {};
        await Promise.all(
          groupList.map(async (group: any) => {
            const games = await getFlashGamesByGroupId(group.id);
            gamesByGroup[group.id] = games;
          })
        );
        setGames(gamesByGroup);
      } catch (err: any) {
        setError(err.message || 'Lỗi khi tải dữ liệu');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
        <CircularProgress />
      </Box>
    );
  }
  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Paper elevation={2} sx={{ mb: 2 }}>
        <Tabs
          value={tab}
          onChange={(_, v) => setTab(v)}
          centered
          sx={{
            '& .MuiTab-root': {
              color: 'text.secondary',
              fontWeight: 500,
              fontSize: { xs: '0.875rem', sm: '1rem' },
              '&.Mui-selected': {
                color: '#667eea',
                fontWeight: 600,
              },
            },
            '& .MuiTabs-indicator': {
              backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              height: 3,
            },
          }}
        >
          {groups.map((group, idx) => (
            <Tab key={group.id} label={group.name} />
          ))}
        </Tabs>
      </Paper>
      {groups.map((group, idx) => (
        <TabPanel value={tab} index={idx} key={group.id}>
          <Box sx={{ maxWidth: 1100, mx: 'auto' }}>
            {games[group.id] && games[group.id].length > 0 ? (
              games[group.id].map((game, i) => (
                <Box key={game.id} sx={{ mb: 4 }}>
                  <Typography variant="h6" align="center" sx={{ mb: 2, fontWeight: 'bold' }}>
                    {game.title}
                  </Typography>
                  <Typography variant="body1" align="center" sx={{ mb: 2 }}>
                    {game.description}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                    <iframe
                      style={{ maxWidth: '100%', border: 0 }}
                      src={game.embed_url}
                      width="1000"
                      height="750"
                      frameBorder={0}
                      allowFullScreen
                      title={game.title}
                    />
                  </Box>
                  {i < games[group.id].length - 1 && <Divider sx={{ my: 3 }} />}
                </Box>
              ))
            ) : (
              <Typography align="center" color="text.secondary">
                Không có trò chơi nào trong nhóm này.
              </Typography>
            )}
          </Box>
        </TabPanel>
      ))}
    </Box>
  );
};

export default Game; 