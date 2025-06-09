import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  useTheme,
  useMediaQuery,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  School as SchoolIcon,
  Book as BookIcon,
  Mic as MicIcon,
  Assignment as AssignmentIcon,
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon,
  SportsEsports as SportsEsportsIcon,
  Edit as EditIcon,
  Draw as DrawIcon,
  EmojiEvents as EmojiEventsIcon,
} from '@mui/icons-material';
import Footer from './Footer';
import { LoginButton } from './LoginButton';
import { UserRank, UserRankInline } from './UserRank';
import { sheetService } from '../services/sheetService';

interface LayoutProps {
  children: React.ReactNode;
  onToggleColorMode: () => void;
  mode: 'light' | 'dark';
}

interface ScoreRecord {
  username: string;
  score: number;
  time: number;
  date: string;
}

const drawerWidth = 240;

const Layout: React.FC<LayoutProps> = ({ children, onToggleColorMode, mode }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [leaderboard, setLeaderboard] = useState<ScoreRecord[]>([]);

  const formatTime = useCallback((seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }, []);

  useEffect(() => {
    if (showLeaderboard) {
      sheetService.getLeaderboard().then((data) => setLeaderboard(data));
    }
  }, [showLeaderboard]);

  const menuItems = [
    { text: 'Trang chủ', icon: <HomeIcon />, path: '/' },
    { text: 'Bảng chữ cái', icon: <SchoolIcon />, path: '/alphabet' },
    { text: 'Trò chơi', icon: <SportsEsportsIcon />, path: '/game' },
    { text: 'Bài học', icon: <BookIcon />, path: '/lessons' },
    { text: 'Luyện tập', icon: <MicIcon />, path: '/practice' },
    { text: 'Kiểm tra', icon: <AssignmentIcon />, path: '/tests' },
    { text: 'Bảng viết', icon: <DrawIcon />, path: '/writing-board' },
    { text: 'Luyện viết', icon: <EditIcon />, path: '/paper-practice' },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          Tiếng Lào
        </Typography>
      </Toolbar>
      <List>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            onClick={() => {
              navigate(item.path);
              if (isMobile) {
                setMobileOpen(false);
              }
            }}
            selected={location.pathname === item.path}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <Box sx={{ display: 'flex' }}>
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
              {menuItems.find((item) => item.path === location.pathname)?.text || 'Trang chủ'}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <IconButton color="inherit" onClick={() => setShowLeaderboard(true)}>
                <EmojiEventsIcon />
              </IconButton>
              <UserRank />
              <LoginButton />
              <IconButton color="inherit" onClick={onToggleColorMode}>
                {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        >
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          <Toolbar />
          {React.cloneElement(children as React.ReactElement, { openLeaderboard: () => setShowLeaderboard(true) })}
        </Box>
      </Box>
      <Footer />
      <Modal
        open={showLeaderboard}
        onClose={() => setShowLeaderboard(false)}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box sx={{
          width: 500,
          bgcolor: '#1a1a1a',
          borderRadius: 2,
          p: 3,
          maxHeight: '80vh',
          overflow: 'auto'
        }}>
          <Typography variant="h6" sx={{ mb: 2, color: '#fff', textAlign: 'center' }}>
            Bảng xếp hạng
          </Typography>
          <TableContainer component={Paper} sx={{ bgcolor: '#1a1a1a' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: '#fff' }}>Hạng</TableCell>
                  <TableCell sx={{ color: '#fff' }}>Tên người dùng</TableCell>
                  <TableCell sx={{ color: '#fff' }}>Điểm</TableCell>
                  <TableCell sx={{ color: '#fff' }}>Thời gian</TableCell>
                  <TableCell sx={{ color: '#fff' }}>Ngày</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {leaderboard.map((record, index) => (
                  <TableRow key={index}>
                    <TableCell sx={{ color: '#fff' }}>{index + 1}</TableCell>
                    <TableCell sx={{ color: '#fff' }}>
                      <UserRankInline username={record.username} rank={index + 1} />
                    </TableCell>
                    <TableCell sx={{ color: '#fff' }}>{record.score}/25</TableCell>
                    <TableCell sx={{ color: '#fff' }}>{formatTime(record.time)}</TableCell>
                    <TableCell sx={{ color: '#fff' }}>{record.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Modal>
    </Box>
  );
};

export default Layout; 