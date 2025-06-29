import React, { useState } from 'react';
import {
  Box,
  Typography,
  Tabs,
  Tab,
} from '@mui/material';
import PracticeCore from '../components/PracticeCore';
import { practiceData } from '../data/practiceData';
import { vowelsFull } from '../data/VowelsData';

function TabPanel(props: { children?: React.ReactNode; index: number; value: number }) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`practice-tabpanel-${index}`}
      aria-labelledby={`practice-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const Practice: React.FC = () => {
  const [value, setValue] = useState(0);
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={(e, v) => setValue(v)}
          aria-label="practice tabs"
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
          <Tab label="Luyện tập phụ âm" />
          <Tab label="Luyện tập nguyên âm" />
          <Tab label="Luyện tập từ vựng" />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <PracticeCore data={practiceData.consonants} type={1} badgeId="badge_001" />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <PracticeCore data={vowelsFull} type={2} badgeId="badge_002" />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Box sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Luyện tập từ vựng
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Tính năng này sẽ được phát triển trong tương lai.
          </Typography>
        </Box>
      </TabPanel>
    </Box>
  );
};

export default Practice; 