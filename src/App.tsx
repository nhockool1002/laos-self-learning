import { Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { useState, useMemo, useEffect } from 'react';
import { lightTheme, darkTheme } from './theme';
import Layout from './components/Layout';
import Home from './pages/Home';
import Lessons from './pages/Lessons';
import Alphabet from './pages/Alphabet';
import Practice from './pages/Practice';
import Tests from './pages/Tests';
import Game from './pages/Game';
import WritingBoard from './pages/WritingBoard';

function App() {
  const [mode, setMode] = useState<'light' | 'dark'>(() => {
    const savedMode = localStorage.getItem('themeMode');
    return (savedMode as 'light' | 'dark') || 'dark';
  });

  const theme = useMemo(() => (mode === 'light' ? lightTheme : darkTheme), [mode]);

  useEffect(() => {
    localStorage.setItem('themeMode', mode);
  }, [mode]);

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout onToggleColorMode={toggleColorMode} mode={mode}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lessons" element={<Lessons />} />
          <Route path="/alphabet" element={<Alphabet />} />
          <Route path="/practice" element={<Practice />} />
          <Route path="/tests" element={<Tests />} />
          <Route path="/game" element={<Game />} />
          <Route path="/writing-board" element={<WritingBoard />} />
        </Routes>
      </Layout>
    </ThemeProvider>
  );
}

export default App; 