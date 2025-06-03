import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import Layout from './components/Layout';
import Home from './pages/Home';
import Alphabet from './pages/Alphabet';
import Lessons from './pages/Lessons';
import Practice from './pages/Practice';
import Tests from './pages/Tests';
import Game from './pages/Game';

const App: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/alphabet" element={<Alphabet />} />
          <Route path="/lessons" element={<Lessons />} />
          <Route path="/practice" element={<Practice />} />
          <Route path="/tests" element={<Tests />} />
          <Route path="/game" element={<Game />} />
        </Routes>
      </Layout>
    </Box>
  );
};

export default App; 