import React, { useState } from 'react';
import { Box, Tabs, Tab, Typography, Paper, Divider } from '@mui/material';

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
          <Tab label="Trò chơi Phụ âm đầu" />
          <Tab label="Trò chơi Phụ âm giữa" />
          <Tab label="Trò chơi Phụ âm cuối" />
        </Tabs>
      </Paper>
      {/* Tab 1: Phụ âm đầu */}
      <TabPanel value={tab} index={0}>
        <Box sx={{ maxWidth: 1100, mx: 'auto' }}>
          <Typography variant="h6" align="center" sx={{ mb: 2, fontWeight: 'bold' }}>
            Trò chơi nối từ
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
            <iframe
              style={{ maxWidth: '100%', border: 0 }}
              src="https://wordwall.net/vi/embed/0bdee233c5d045d5a4be49b4fd521f55?themeId=44&templateId=3&fontStackId=0"
              width="1000"
              height="750"
              frameBorder={0}
              allowFullScreen
              title="Trò chơi nối từ"
            />
          </Box>
          <Divider sx={{ my: 3 }} />
          <Typography variant="h6" align="center" sx={{ mb: 2, fontWeight: 'bold' }}>
            Nổ Bóng bay
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
            <iframe
              style={{ maxWidth: '100%', border: 0 }}
              src="https://wordwall.net/vi/embed/80332e9746cb4949b2560e8a6effe91d?themeId=22&templateId=71&fontStackId=0"
              width="1000"
              height="750"
              frameBorder={0}
              allowFullScreen
              title="Nổ Bóng bay"
            />
          </Box>
          <Divider sx={{ my: 3 }} />
          <Typography variant="h6" align="center" sx={{ mb: 2, fontWeight: 'bold' }}>
            Tìm đáp án phù hợp
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <iframe
              style={{ maxWidth: '100%', border: 0 }}
              src="https://wordwall.net/vi/embed/b39b6eb414aa4f50b4592e9f366bd3d2?themeId=1&templateId=46&fontStackId=0"
              width="1000"
              height="750"
              frameBorder={0}
              allowFullScreen
              title="Tìm đáp án phù hợp"
            />
          </Box>
        </Box>
      </TabPanel>
      {/* Tab 2: Phụ âm giữa */}
      <TabPanel value={tab} index={1}>
        <Box sx={{ maxWidth: 1100, mx: 'auto' }}>
          <Typography variant="h6" align="center" sx={{ mb: 2, fontWeight: 'bold' }}>
            Trò chơi Nổ Bóng Bay
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
            <iframe
              style={{ maxWidth: '100%', border: 0 }}
              src="https://wordwall.net/vi/embed/2fb47efadf804391950c18b3fae065de?themeId=22&templateId=71&fontStackId=0"
              width="1000"
              height="750"
              frameBorder={0}
              allowFullScreen
              title="Trò chơi Nổ Bóng Bay giữa"
            />
          </Box>
          <Divider sx={{ my: 3 }} />
          <Typography variant="h6" align="center" sx={{ mb: 2, fontWeight: 'bold' }}>
            Trò chơi tìm đáp án phù hợp 1
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
            <iframe
              style={{ maxWidth: '100%', border: 0 }}
              src="https://wordwall.net/vi/embed/8b0d147b6e484be1a2cbe573db80ddf1?themeId=1&templateId=46&fontStackId=0"
              width="1000"
              height="750"
              frameBorder={0}
              allowFullScreen
              title="Trò chơi tìm đáp án phù hợp 1"
            />
          </Box>
          <Divider sx={{ my: 3 }} />
          <Typography variant="h6" align="center" sx={{ mb: 2, fontWeight: 'bold' }}>
            Trò chơi tìm đáp án phù hợp 2
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
            <iframe
              style={{ maxWidth: '100%', border: 0 }}
              src="https://wordwall.net/vi/embed/b21a0351f7494b7e9ac53466ed329912?themeId=1&templateId=46&fontStackId=0"
              width="1000"
              height="750"
              frameBorder={0}
              allowFullScreen
              title="Trò chơi tìm đáp án phù hợp 2"
            />
          </Box>
          <Divider sx={{ my: 3 }} />
          <Typography variant="h6" align="center" sx={{ mb: 2, fontWeight: 'bold' }}>
            Trò chơi Nối từ
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <iframe
              style={{ maxWidth: '100%', border: 0 }}
              src="https://wordwall.net/vi/embed/c20829ee6aba458cb4827f104c212e6a?themeId=1&templateId=3&fontStackId=0"
              width="1000"
              height="750"
              frameBorder={0}
              allowFullScreen
              title="Trò chơi Nối từ giữa"
            />
          </Box>
        </Box>
      </TabPanel>
      {/* Tab 3: Phụ âm cuối */}
      <TabPanel value={tab} index={2}>
        <Box sx={{ maxWidth: 1100, mx: 'auto' }}>
          <Typography variant="h6" align="center" sx={{ mb: 2, fontWeight: 'bold' }}>
            Trò chơi Tìm đáp án phù hợp
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
            <iframe
              style={{ maxWidth: '100%', border: 0 }}
              src="https://wordwall.net/vi/embed/02039c8122c54ab1803173428ec22428?themeId=1&templateId=46&fontStackId=0"
              width="1000"
              height="750"
              frameBorder={0}
              allowFullScreen
              title="Trò chơi Tìm đáp án phù hợp cuối"
            />
          </Box>
          <Divider sx={{ my: 3 }} />
          <Typography variant="h6" align="center" sx={{ mb: 2, fontWeight: 'bold' }}>
            Trò chơi nổ bóng bay
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <iframe
              style={{ maxWidth: '100%', border: 0 }}
              src="https://wordwall.net/vi/embed/51ffd2e62a4f46499b10d593af1bf940?themeId=22&templateId=71&fontStackId=0"
              width="1000"
              height="750"
              frameBorder={0}
              allowFullScreen
              title="Trò chơi nổ bóng bay cuối"
            />
          </Box>
        </Box>
      </TabPanel>
    </Box>
  );
};

export default Game; 