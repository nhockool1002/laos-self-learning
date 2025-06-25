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
  Tooltip,
  Menu,
  MenuItem,
  Avatar,
  Tabs,
  Tab,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon,
  SportsEsports as SportsEsportsIcon,
  Draw as DrawIcon,
  EmojiEvents as EmojiEventsIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Close as CloseIcon,
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
  FontDownload as FontDownloadIcon,
  MenuBook as MenuBookIcon,
  PsychologyAlt as PsychologyAltIcon,
  Quiz as QuizIcon,
  FactCheck as FactCheckIcon,
} from '@mui/icons-material';
import { LoginButton } from './LoginButton';
import { UserRank, UserRankInline } from './UserRank';
import { supabase, TABLES } from '../config/supabaseConfig';
import { useI18n } from '../hooks/useI18n';

interface LayoutProps {
  children: React.ReactNode;
  onToggleColorMode: () => void;
  mode: 'light' | 'dark';
  showLeaderboard: boolean;
  setShowLeaderboard: (v: boolean) => void;
}

interface ScoreRecord {
  username: string;
  score: number;
  time: number;
  date: string;
  type: number;
}

const drawerWidth = 240;
const collapsedDrawerWidth = 64;

const Layout: React.FC<LayoutProps> = ({ children, onToggleColorMode, mode, showLeaderboard, setShowLeaderboard }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    const saved = localStorage.getItem('sidebarCollapsed');
    return saved ? JSON.parse(saved) : false;
  });
  const [languageMenuAnchor, setLanguageMenuAnchor] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [tabType, setTabType] = useState(1);
  const [leaderboard, setLeaderboard] = useState<ScoreRecord[]>([]);
  const [openPracticeMenu, setOpenPracticeMenu] = useState(false);

  // Sử dụng i18n service
  const { t, currentLanguage, setLanguage, availableLanguages } = useI18n();

  const fetchLeaderboard = async (type: number) => {
    try {
      const query = supabase
        .from(TABLES.LEADERBOARD)
        .select('*')
        .eq('type', type)
        .order('score', { ascending: false })
        .order('time', { ascending: true });
      const { data, error } = await query;
      if (error) throw error;
      setLeaderboard(data || []);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    }
  };

  useEffect(() => {
    fetchLeaderboard(tabType);
  }, [tabType]);

  useEffect(() => {
    localStorage.setItem('sidebarCollapsed', JSON.stringify(sidebarCollapsed));
  }, [sidebarCollapsed]);

  const formatTime = useCallback((seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }, []);

  const menuItems = [
    { text: t('menu.home', 'Trang chủ'), icon: <HomeIcon />, path: '/' },
    { text: t('menu.alphabet', 'Bảng chữ cái'), icon: <FontDownloadIcon />, path: '/alphabet' },
    { text: t('menu.lessons', 'Bài học'), icon: <MenuBookIcon />, path: '/lessons' },
    {
      text: t('menu.practice_group', 'Luyện tập'),
      icon: <PsychologyAltIcon />,
      children: [
        { text: t('menu.practice', 'Luyện tập trắc nghiệm'), icon: <QuizIcon />, path: '/practice' },
        { text: t('menu.game', 'Luyện tập với trò chơi'), icon: <SportsEsportsIcon />, path: '/game' },
        { text: t('menu.writing_board', 'Luyện tập với bảng viết'), icon: <DrawIcon />, path: '/writing-board' },
      ]
    },
    { text: t('menu.tests', 'Kiểm tra'), icon: <FactCheckIcon />, path: '/tests' },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSidebarToggle = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const currentDrawerWidth = sidebarCollapsed ? collapsedDrawerWidth : drawerWidth;

  const handleLanguageMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setLanguageMenuAnchor(event.currentTarget);
  };

  const handleLanguageMenuClose = () => {
    setLanguageMenuAnchor(null);
  };

  const handleLanguageChange = (language: 'vi' | 'en') => {
    setLanguage(language);
    handleLanguageMenuClose();
  };

  const getCurrentLanguageFlag = () => {
    return currentLanguage === 'vi' ? '/vietnam.png' : '/english.png';
  };

  const getCurrentLanguageName = () => {
    return availableLanguages.find(lang => lang.code === currentLanguage)?.name || currentLanguage;
  };

  const drawer = (
    <Box
      sx={{
        height: '100%',
        background: theme.palette.mode === 'dark' 
          ? 'linear-gradient(180deg, #1a1a1a 0%, #2d2d2d 100%)'
          : 'linear-gradient(180deg, #f8f9fa 0%, #e9ecef 100%)',
        borderRight: '1px solid',
        borderColor: 'divider',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header Section */}
      <Box
        sx={{
          p: 2,
          borderBottom: '1px solid',
          borderColor: 'divider',
          background: theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, 0.05)'
            : 'rgba(0, 0, 0, 0.02)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            minHeight: '48px',
          }}
        >
          {!sidebarCollapsed && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: '8px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
                  overflow: 'hidden',
                }}
              >
                <img
                  src="/laos.png"
                  alt="Laos Flag"
                  style={{
                    width: '20px',
                    height: '20px',
                    objectFit: 'contain',
                  }}
                />
              </Box>
              <Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    fontSize: '1.1rem',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    lineHeight: 1.2,
                  }}
                >
                  {t('sidebar.title', 'Tiếng Lào')}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: 'text.secondary',
                    fontSize: '0.75rem',
                    fontWeight: 500,
                  }}
                >
                  {t('sidebar.subtitle', 'Learning App')}
                </Typography>
              </Box>
            </Box>
          )}
          <IconButton
            onClick={handleSidebarToggle}
            sx={{
              width: 40,
              height: 40,
              background: theme.palette.mode === 'dark'
                ? 'rgba(255, 255, 255, 0.1)'
                : 'rgba(0, 0, 0, 0.05)',
              border: '1px solid',
              borderColor: 'divider',
              color: 'text.secondary',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              backdropFilter: 'blur(10px)',
              '&:hover': {
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                borderColor: 'transparent',
                transform: 'scale(1.05)',
                boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)',
              },
              '&:active': {
                transform: 'scale(0.95)',
              },
              ...(sidebarCollapsed && {
                ml: 'auto',
                mr: 'auto',
              }),
            }}
          >
            {sidebarCollapsed ? <ChevronRightIcon fontSize="small" /> : <ChevronLeftIcon fontSize="small" />}
          </IconButton>
        </Box>
      </Box>

      {/* Navigation Section */}
      <Box sx={{ flex: 1, p: 1.5, overflow: 'auto' }}>
        <List sx={{ p: 0 }}>
          {menuItems.map((item, index) => (
            item.children ? (
              <Box key={item.text}>
                <Tooltip
                  title={item.text}
                  placement="right"
                  disableHoverListener={!sidebarCollapsed}
                  arrow
                  sx={{
                    '& .MuiTooltip-tooltip': {
                      bgcolor: 'rgba(0, 0, 0, 0.9)',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      borderRadius: '8px',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                    },
                  }}
                >
                  <ListItem
                    button
                    onClick={() => {
                      if (!sidebarCollapsed) setOpenPracticeMenu((prev) => !prev);
                    }}
                    sx={{
                      minHeight: 52,
                      borderRadius: '12px',
                      mx: sidebarCollapsed ? 0.5 : 0,
                      mb: 1,
                      px: sidebarCollapsed ? 1.5 : 2,
                      py: 1,
                      justifyContent: sidebarCollapsed ? 'center' : 'flex-start',
                      background: !sidebarCollapsed && (openPracticeMenu || item.children.some(child => location.pathname === child.path))
                        ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                        : 'rgba(102, 126, 234, 0.07)',
                      color: !sidebarCollapsed && (openPracticeMenu || item.children.some(child => location.pathname === child.path))
                        ? 'white'
                        : 'inherit',
                      border: '1px solid',
                      borderColor: 'divider',
                      position: 'relative',
                      overflow: 'hidden',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minWidth: 'unset',
                        width: 32,
                        height: 32,
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    {!sidebarCollapsed && (
                      <ListItemText
                        primary={item.text}
                        sx={{ '& .MuiListItemText-primary': { fontWeight: 600, fontSize: '0.9rem' } }}
                      />
                    )}
                    {!sidebarCollapsed && (
                      openPracticeMenu ? <ExpandLessIcon fontSize="small" /> : <ExpandMoreIcon fontSize="small" />
                    )}
                  </ListItem>
                </Tooltip>
                {/* Render children nếu sidebar mở rộng và openPracticeMenu true */}
                {!sidebarCollapsed && openPracticeMenu && (
                  <List disablePadding sx={{ ml: 3 }}>
                    {item.children.map((child) => (
                      <ListItem
                        button
                        key={child.text}
                        onClick={() => {
                          navigate(child.path);
                          if (isMobile) setMobileOpen(false);
                        }}
                        selected={location.pathname === child.path}
                        sx={{
                          minHeight: 44,
                          borderRadius: '10px',
                          mb: 0.5,
                          px: 2,
                          py: 0.5,
                          background: location.pathname === child.path
                            ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                            : 'transparent',
                          color: location.pathname === child.path ? 'white' : 'text.primary',
                          fontWeight: location.pathname === child.path ? 600 : 500,
                          '&:hover': {
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            color: 'white',
                          },
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            minWidth: 'unset',
                            width: 28,
                            height: 28,
                          }}
                        >
                          {child.icon}
                        </ListItemIcon>
                        <ListItemText primary={child.text} />
                      </ListItem>
                    ))}
                  </List>
                )}
              </Box>
            ) : (
              <Tooltip
                key={item.text}
                title={item.text}
                placement="right"
                disableHoverListener={!sidebarCollapsed}
                arrow
                sx={{
                  '& .MuiTooltip-tooltip': {
                    bgcolor: 'rgba(0, 0, 0, 0.9)',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    borderRadius: '8px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                  },
                }}
              >
                <ListItem
                  button
                  onClick={() => {
                    navigate(item.path);
                    if (isMobile) {
                      setMobileOpen(false);
                    }
                  }}
                  selected={location.pathname === item.path}
                  sx={{
                    minHeight: 52,
                    borderRadius: '12px',
                    mx: sidebarCollapsed ? 0.5 : 0,
                    mb: 1,
                    px: sidebarCollapsed ? 1.5 : 2,
                    py: 1,
                    justifyContent: sidebarCollapsed ? 'center' : 'flex-start',
                    background: location.pathname === item.path
                      ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                      : theme.palette.mode === 'dark'
                        ? 'rgba(255, 255, 255, 0.03)'
                        : 'rgba(0, 0, 0, 0.02)',
                    border: '1px solid',
                    borderColor: location.pathname === item.path
                      ? 'transparent'
                      : 'divider',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      opacity: 0,
                      transition: 'opacity 0.3s ease',
                      zIndex: 0,
                    },
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 8px 25px rgba(102, 126, 234, 0.2)',
                      borderColor: 'transparent',
                      '&::before': {
                        opacity: 0.1,
                      },
                      '& .MuiListItemIcon-root': {
                        transform: 'scale(1.1)',
                      },
                    },
                    '&.Mui-selected': {
                      color: 'white',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
                      },
                      '& .MuiListItemIcon-root': {
                        color: 'white',
                      },
                      '& .MuiListItemText-primary': {
                        color: 'white',
                        fontWeight: 600,
                      },
                    },
                    '& .MuiListItemIcon-root': {
                      color: location.pathname === item.path ? 'white' : 'text.secondary',
                      minWidth: sidebarCollapsed ? 0 : 40,
                      justifyContent: 'center',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      zIndex: 1,
                      position: 'relative',
                    },
                    '& .MuiListItemText-root': {
                      zIndex: 1,
                      position: 'relative',
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      minWidth: 'unset',
                      width: 32,
                      height: 32,
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  {!sidebarCollapsed && (
                    <ListItemText
                      primary={item.text}
                      sx={{
                        '& .MuiListItemText-primary': {
                          fontWeight: location.pathname === item.path ? 600 : 500,
                          fontSize: '0.9rem',
                          color: location.pathname === item.path ? 'white' : 'text.primary',
                          transition: 'all 0.3s ease',
                        },
                      }}
                    />
                  )}
                </ListItem>
              </Tooltip>
            )
          ))}
        </List>
      </Box>

      {/* Language Switcher Section */}
      <Box
        sx={{
          p: 1.5,
          borderTop: '1px solid',
          borderColor: 'divider',
          background: theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, 0.02)'
            : 'rgba(0, 0, 0, 0.01)',
        }}
      >
        <Tooltip 
          title={t('common.language', 'Ngôn ngữ')}
          placement="right"
          disableHoverListener={!sidebarCollapsed}
          arrow
          sx={{
            '& .MuiTooltip-tooltip': {
              bgcolor: 'rgba(0, 0, 0, 0.9)',
              fontSize: '0.875rem',
              fontWeight: 600,
              borderRadius: '8px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
            },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: sidebarCollapsed ? 0 : 2,
              p: sidebarCollapsed ? 1 : 1.5,
              borderRadius: '12px',
              cursor: 'pointer',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              background: theme.palette.mode === 'dark'
                ? 'rgba(255, 255, 255, 0.03)'
                : 'rgba(0, 0, 0, 0.02)',
              border: '1px solid',
              borderColor: 'divider',
              '&:hover': {
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderColor: 'transparent',
                transform: 'translateY(-1px)',
                boxShadow: '0 4px 15px rgba(102, 126, 234, 0.2)',
                '& .MuiAvatar-root': {
                  transform: 'scale(1.1)',
                },
                '& .MuiTypography-root': {
                  color: 'white',
                },
              },
            }}
            onClick={handleLanguageMenuOpen}
          >
            <Avatar
              src={getCurrentLanguageFlag()}
              alt={getCurrentLanguageName()}
              sx={{
                width: sidebarCollapsed ? 24 : 28,
                height: sidebarCollapsed ? 24 : 28,
                border: '1px solid rgba(255, 255, 255, 0.2)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            />
            {!sidebarCollapsed && (
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 500,
                  fontSize: '0.85rem',
                  color: 'text.primary',
                  transition: 'all 0.3s ease',
                  flex: 1,
                }}
              >
                {getCurrentLanguageName()}
              </Typography>
            )}
          </Box>
        </Tooltip>
      </Box>

      {/* Footer Section */}
      {!sidebarCollapsed && (
        <Box
          sx={{
            p: 2,
            borderTop: '1px solid',
            borderColor: 'divider',
            background: theme.palette.mode === 'dark'
              ? 'rgba(255, 255, 255, 0.02)'
              : 'rgba(0, 0, 0, 0.01)',
          }}
        >
          <Typography
            variant="caption"
            sx={{
              color: 'text.secondary',
              fontSize: '0.75rem',
              fontWeight: 500,
              textAlign: 'center',
              display: 'block',
            }}
          >
            {t('sidebar.footer', '© 2025 Tiếng Lào')}
          </Typography>
        </Box>
      )}
    </Box>
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
            width: { sm: `calc(100% - ${currentDrawerWidth}px)` },
            ml: { sm: `${currentDrawerWidth}px` },
            transition: theme.transitions.create(['margin', 'width'], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
            background: theme.palette.mode === 'dark'
              ? 'rgba(26, 26, 26, 0.95)'
              : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            backdropFilter: 'blur(10px)',
            borderBottom: '1px solid',
            borderColor: theme.palette.mode === 'dark'
              ? 'rgba(255, 255, 255, 0.1)'
              : 'rgba(255, 255, 255, 0.2)',
            boxShadow: theme.palette.mode === 'dark'
              ? '0 4px 20px rgba(0, 0, 0, 0.3)'
              : '0 4px 20px rgba(102, 126, 234, 0.3)',
          }}
        >
          <Toolbar
            sx={{
              background: theme.palette.mode === 'dark'
                ? 'linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%)'
                : 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
              minHeight: '64px',
              px: { xs: 2, sm: 3 },
            }}
          >
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ 
                mr: 2, 
                display: { sm: 'none' },
                background: theme.palette.mode === 'dark'
                  ? 'rgba(255, 255, 255, 0.1)'
                  : 'rgba(255, 255, 255, 0.2)',
                border: '1px solid',
                borderColor: theme.palette.mode === 'dark'
                  ? 'rgba(255, 255, 255, 0.1)'
                  : 'rgba(255, 255, 255, 0.3)',
                color: theme.palette.mode === 'dark' ? 'inherit' : 'white',
                '&:hover': {
                  background: theme.palette.mode === 'dark'
                    ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                    : 'rgba(255, 255, 255, 0.3)',
                  borderColor: 'transparent',
                },
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography 
              variant="h6" 
              noWrap 
              component="div" 
              sx={{ 
                flexGrow: 1,
                fontWeight: 600,
                color: theme.palette.mode === 'dark' ? 'inherit' : 'white',
                background: theme.palette.mode === 'dark'
                  ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                  : 'none',
                backgroundClip: theme.palette.mode === 'dark' ? 'text' : 'unset',
                WebkitBackgroundClip: theme.palette.mode === 'dark' ? 'text' : 'unset',
                WebkitTextFillColor: theme.palette.mode === 'dark' ? 'transparent' : 'unset',
              }}
            >
              {menuItems.find((item) => item.path === location.pathname)?.text || t('menu.home', 'Trang chủ')}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <IconButton 
                color="inherit" 
                onClick={() => setShowLeaderboard(true)}
                sx={{
                  background: theme.palette.mode === 'dark'
                    ? 'rgba(255, 255, 255, 0.1)'
                    : 'rgba(255, 255, 255, 0.2)',
                  border: '1px solid',
                  borderColor: theme.palette.mode === 'dark'
                    ? 'rgba(255, 255, 255, 0.1)'
                    : 'rgba(255, 255, 255, 0.3)',
                  color: theme.palette.mode === 'dark' ? 'inherit' : 'white',
                  '&:hover': {
                    background: theme.palette.mode === 'dark'
                      ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                      : 'rgba(255, 255, 255, 0.3)',
                    borderColor: 'transparent',
                    transform: 'scale(1.05)',
                  },
                }}
              >
                <EmojiEventsIcon />
              </IconButton>
              <UserRank />
              <LoginButton />
              
              <IconButton 
                color="inherit" 
                onClick={onToggleColorMode}
                sx={{
                  background: theme.palette.mode === 'dark'
                    ? 'rgba(255, 255, 255, 0.1)'
                    : 'rgba(255, 255, 255, 0.2)',
                  border: '1px solid',
                  borderColor: theme.palette.mode === 'dark'
                    ? 'rgba(255, 255, 255, 0.1)'
                    : 'rgba(255, 255, 255, 0.3)',
                  color: theme.palette.mode === 'dark' ? 'inherit' : 'white',
                  '&:hover': {
                    background: theme.palette.mode === 'dark'
                      ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                      : 'rgba(255, 255, 255, 0.3)',
                    borderColor: 'transparent',
                    transform: 'scale(1.05)',
                  },
                }}
              >
                {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        <Box
          component="nav"
          sx={{ 
            width: { sm: currentDrawerWidth }, 
            flexShrink: { sm: 0 },
            transition: theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
          }}
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
                width: currentDrawerWidth,
                transition: theme.transitions.create('width', {
                  easing: theme.transitions.easing.sharp,
                  duration: theme.transitions.duration.enteringScreen,
                }),
                overflowX: 'hidden',
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
            width: { sm: `calc(100% - ${currentDrawerWidth}px)` },
            transition: theme.transitions.create(['margin', 'width'], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
          }}
        >
          <Toolbar />
          {React.cloneElement(children as React.ReactElement, { openLeaderboard: () => setShowLeaderboard(true) })}
        </Box>
      </Box>
      <Modal
        open={showLeaderboard}
        onClose={() => setShowLeaderboard(false)}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1300,
        }}
        closeAfterTransition
        BackdropProps={{
          sx: { background: 'rgba(30, 34, 60, 0.7)' }
        }}
      >
        <Box>
          <Box
            sx={{
              width: { xs: '95vw', sm: 500 },
              bgcolor: 'transparent',
              borderRadius: { xs: 3, sm: 5 },
              boxShadow: 24,
              p: 0,
              maxHeight: '80vh',
              overflow: 'auto',
              animation: 'fadeInScale 0.4s cubic-bezier(.4,2,.6,1)',
              position: 'relative',
            }}
          >
            <Box
              sx={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderTopLeftRadius: { xs: 24, sm: 40 },
                borderTopRightRadius: { xs: 24, sm: 40 },
                px: { xs: 3, sm: 5 },
                py: { xs: 2, sm: 3 },
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                justifyContent: 'center',
                boxShadow: '0 4px 24px 0 rgba(102,126,234,0.15)',
                position: 'relative',
              }}
            >
              <EmojiEventsIcon sx={{ color: '#ffd700', fontSize: 32, mr: 1 }} />
              <Typography variant="h5" sx={{ color: '#fff', fontWeight: 700, letterSpacing: 1 }}>
                {t('leaderboard.title', 'Bảng xếp hạng')}
              </Typography>
              <IconButton
                onClick={() => setShowLeaderboard(false)}
                sx={{
                  position: 'absolute',
                  right: 12,
                  top: 8,
                  color: '#fff',
                  background: 'rgba(255,255,255,0.08)',
                  '&:hover': { background: 'rgba(255,255,255,0.18)' },
                }}
              >
                <CloseIcon />
              </IconButton>
            </Box>
            <Tabs
              value={tabType}
              onChange={(_, v) => setTabType(v)}
              centered
              sx={{
                bgcolor: 'rgba(40,44,72,0.85)',
                minHeight: 48,
                px: 2,
                py: 1,
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
                borderBottomLeftRadius: 16,
                borderBottomRightRadius: 16,
                boxShadow: 'none',
                '& .MuiTabs-indicator': {
                  height: 0,
                },
                borderBottom: '1.5px solid #444',
              }}
            >
              <Tab
                label='Xếp hạng Phụ Âm'
                value={1}
                sx={{
                  fontWeight: tabType === 1 ? 400 : 200,
                  fontSize: 16,
                  color: tabType === 1 ? '#fff !important' : '#b0b0b0',
                  background: tabType === 1
                    ? 'rgba(118,75,162,0.95)'
                    : 'transparent',
                  borderRadius: 2,
                  minHeight: 44,
                  mx: 1,
                  boxShadow: tabType === 1 ? '0 2px 12px 0 rgba(102,126,234,0.18)' : 'none',
                  transition: 'all 0.25s cubic-bezier(.4,2,.6,1)',
                  textTransform: 'none',
                  letterSpacing: 0.5,
                  textShadow: tabType === 1 ? '0 2px 8px #222, 0 0 2px #fff' : 'none',
                  border: tabType === 1 ? '2px solid #fff' : 'none',
                }}
              />
              <Tab
                label='Xếp hạng Nguyên Âm'
                value={2}
                sx={{
                  fontWeight: tabType === 2 ? 400 : 200,
                  fontSize: 16,
                  color: tabType === 2 ? '#fff !important' : '#b0b0b0',
                  background: tabType === 2
                    ? 'rgba(118,75,162,0.95)'
                    : 'transparent',
                  borderRadius: 2,
                  minHeight: 44,
                  mx: 1,
                  boxShadow: tabType === 2 ? '0 2px 12px 0 rgba(102,126,234,0.18)' : 'none',
                  transition: 'all 0.25s cubic-bezier(.4,2,.6,1)',
                  textTransform: 'none',
                  letterSpacing: 0.5,
                  textShadow: tabType === 2 ? '0 2px 8px #222, 0 0 2px #fff' : 'none',
                  border: tabType === 2 ? '2px solid #fff' : 'none',
                }}
              />
            </Tabs>
            <TableContainer component={Paper} sx={{
              bgcolor: 'rgba(30,34,60,0.98)',
              borderBottomLeftRadius: { xs: 24, sm: 40 },
              borderBottomRightRadius: { xs: 24, sm: 40 },
              boxShadow: 'none',
              px: { xs: 1, sm: 3 },
              pt: 2,
              pb: 1,
            }}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ color: '#fff', fontWeight: 600, border: 0 }}>{t('leaderboard.rank', 'Hạng')}</TableCell>
                    <TableCell sx={{ color: '#fff', fontWeight: 600, border: 0 }}>{t('leaderboard.username', 'Tên người dùng')}</TableCell>
                    <TableCell sx={{ color: '#fff', fontWeight: 600, border: 0 }}>{t('leaderboard.score', 'Điểm')}</TableCell>
                    <TableCell sx={{ color: '#fff', fontWeight: 600, border: 0 }}>{t('leaderboard.time', 'Thời gian')}</TableCell>
                    <TableCell sx={{ color: '#fff', fontWeight: 600, border: 0 }}>{t('leaderboard.date', 'Ngày')}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {leaderboard.map((record, index) => (
                    <TableRow
                      key={index}
                      sx={{
                        background:
                          index === 0 ? 'linear-gradient(90deg,#ffd700 60%,#fffbe6 100%)'
                          : index === 1 ? 'linear-gradient(90deg,#b0c4de 60%,#e6f0ff 100%)'
                          : index === 2 ? 'linear-gradient(90deg,#ffb347 60%,#fff2e6 100%)'
                          : 'transparent',
                        color: index < 3 ? '#222' : '#fff',
                        fontWeight: index < 3 ? 700 : 500,
                        transition: 'background 0.2s',
                        '&:hover': {
                          background: index < 3 ? undefined : 'rgba(102,126,234,0.12)',
                          boxShadow: index < 3 ? undefined : '0 2px 8px 0 rgba(102,126,234,0.10)',
                        },
                      }}
                    >
                      <TableCell sx={{ color: index < 3 ? '#222' : '#fff', fontWeight: 700, border: 0 }}>{index + 1}</TableCell>
                      <TableCell sx={{ color: index < 3 ? '#222' : '#fff', border: 0 }}>
                        <UserRankInline username={record.username} rank={index + 1} />
                      </TableCell>
                      <TableCell sx={{ color: index < 3 ? '#222' : '#fff', border: 0 }}>{record.score}/25</TableCell>
                      <TableCell sx={{ color: index < 3 ? '#222' : '#fff', border: 0 }}>{formatTime(record.time)}</TableCell>
                      <TableCell sx={{ color: index < 3 ? '#222' : '#fff', border: 0 }}>{record.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </Modal>
      
      {/* Language Menu */}
      <Menu
        anchorEl={languageMenuAnchor}
        open={Boolean(languageMenuAnchor)}
        onClose={handleLanguageMenuClose}
        PaperProps={{
          sx: {
            background: theme.palette.mode === 'dark'
              ? 'rgba(30, 30, 30, 0.95)'
              : 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            border: '1px solid',
            borderColor: 'divider',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            minWidth: 160,
          }
        }}
        transformOrigin={{ horizontal: 'left', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {availableLanguages.map((language) => (
          <MenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            selected={currentLanguage === language.code}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              py: 1.5,
              px: 2,
              transition: 'all 0.2s ease',
              '&:hover': {
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                '& .MuiAvatar-root': {
                  borderColor: 'rgba(255, 255, 255, 0.5)',
                },
              },
              '&.Mui-selected': {
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                '&:hover': {
                  background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
                },
              },
            }}
          >
            <Avatar
              src={language.code === 'vi' ? '/vietnam.png' : '/english.png'}
              alt={language.name}
              sx={{
                width: 20,
                height: 20,
                border: '1px solid rgba(255, 255, 255, 0.2)',
              }}
            />
            <Typography
              variant="body2"
              sx={{
                fontWeight: currentLanguage === language.code ? 600 : 400,
              }}
            >
              {language.name}
            </Typography>
          </MenuItem>
        ))}
      </Menu>
      <style>{`
      @keyframes fadeInScale {
        0% { opacity: 0; transform: scale(0.85); }
        100% { opacity: 1; transform: scale(1); }
      }
      `}</style>
    </Box>
  );
};

export default Layout; 