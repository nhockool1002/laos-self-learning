import React, { useState } from 'react';
import {
  Modal,
  Box,
  Button,
  TextField,
  Tabs,
  Tab,
  Alert,
  InputAdornment,
  Backdrop,
} from '@mui/material';
import {
  Email as EmailIcon,
  Person as PersonIcon,
  Lock as LockIcon,
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`login-tabpanel-${index}`}
      aria-labelledby={`login-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export const LoginModal: React.FC<LoginModalProps> = ({ open, onClose }) => {
  const { login, register, error } = useAuth();
  const [tabValue, setTabValue] = useState(0);
  const [loginForm, setLoginForm] = useState({ emailOrUsername: '', password: '' });
  const [registerForm, setRegisterForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({
    loginEmailOrUsername: '',
    registerUsername: '',
    registerEmail: '',
    password: '',
    confirmPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateLength = (value: string, min: number, max: number): boolean => {
    return value.length >= min && value.length <= max;
  };

  const validateLoginForm = () => {
    const newErrors = { ...errors };
    newErrors.loginEmailOrUsername = '';

    if (!validateLength(loginForm.emailOrUsername, 6, 255)) {
      newErrors.loginEmailOrUsername = 'Email/Username phải từ 6 đến 255 ký tự';
    }

    setErrors(newErrors);
    return !newErrors.loginEmailOrUsername;
  };

  const validateRegisterForm = () => {
    const newErrors = { ...errors };
    newErrors.registerUsername = '';
    newErrors.registerEmail = '';
    newErrors.password = '';
    newErrors.confirmPassword = '';

    // Validate username
    if (!validateLength(registerForm.username, 6, 255)) {
      newErrors.registerUsername = 'Username phải từ 6 đến 255 ký tự';
    }

    // Validate email
    if (!validateLength(registerForm.email, 6, 255)) {
      newErrors.registerEmail = 'Email phải từ 6 đến 255 ký tự';
    } else if (!validateEmail(registerForm.email)) {
      newErrors.registerEmail = 'Email không hợp lệ';
    }

    // Validate password
    if (registerForm.password.length < 6) {
      newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
    }

    // Validate confirm password
    if (registerForm.password !== registerForm.confirmPassword) {
      newErrors.confirmPassword = 'Mật khẩu không khớp';
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== '');
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    // Reset errors when switching tabs
    setErrors({
      loginEmailOrUsername: '',
      registerUsername: '',
      registerEmail: '',
      password: '',
      confirmPassword: '',
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      if (tabValue === 0) {
        const success = await login(loginForm.emailOrUsername, loginForm.password);
        if (success) {
          handleClose();
        }
      } else {
        const success = await register({
          username: registerForm.username,
          email: registerForm.email,
          password: registerForm.password,
          createdat: new Date().toISOString()
        });
        if (success) {
          handleClose();
        }
      }
    } catch (err) {
      // Có thể set thêm error nếu muốn
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginEmailOrUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLoginForm({ ...loginForm, emailOrUsername: value });
    if (value.length > 0) {
      validateLoginForm();
    }
  };

  const handleRegisterUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setRegisterForm({ ...registerForm, username: value });
    if (value.length > 0) {
      validateRegisterForm();
    }
  };

  const handleRegisterEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setRegisterForm({ ...registerForm, email: value });
    if (value.length > 0) {
      validateRegisterForm();
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setRegisterForm({ ...registerForm, password: newPassword });
    if (registerForm.confirmPassword) {
      validateRegisterForm();
    }
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newConfirmPassword = e.target.value;
    setRegisterForm({ ...registerForm, confirmPassword: newConfirmPassword });
    validateRegisterForm();
  };

  // Reset form khi đóng modal
  const handleClose = () => {
    setLoginForm({ emailOrUsername: '', password: '' });
    setRegisterForm({ username: '', email: '', password: '', confirmPassword: '' });
    setErrors({
      loginEmailOrUsername: '',
      registerUsername: '',
      registerEmail: '',
      password: '',
      confirmPassword: '',
    });
    setIsLoading(false);
    onClose();
  };

  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="login-modal-title"
        aria-describedby="login-modal-description"
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
          }}
        >
          {error && (
            <Alert severity="error" sx={{ m: 2 }}>
              {error}
            </Alert>
          )}
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            variant="fullWidth"
            sx={{ borderBottom: 1, borderColor: 'divider' }}
          >
            <Tab label="Đăng nhập" />
            <Tab label="Đăng ký" />
          </Tabs>

          <TabPanel value={tabValue} index={0}>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Email / Tên đăng nhập"
                margin="normal"
                value={loginForm.emailOrUsername}
                onChange={handleLoginEmailOrUsernameChange}
                required
                error={!!errors.loginEmailOrUsername}
                helperText={errors.loginEmailOrUsername}
                disabled={isLoading}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                fullWidth
                label="Mật khẩu"
                type="password"
                margin="normal"
                value={loginForm.password}
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                required
                disabled={isLoading}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                fullWidth
                variant="contained"
                color="primary"
                type="submit"
                sx={{ mt: 2 }}
                disabled={isLoading}
              >
                {isLoading ? 'Đang xử lý...' : 'Đăng nhập'}
              </Button>
            </form>
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Tên đăng nhập"
                margin="normal"
                value={registerForm.username}
                onChange={handleRegisterUsernameChange}
                required
                error={!!errors.registerUsername}
                helperText={errors.registerUsername}
                disabled={isLoading}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                fullWidth
                label="Email"
                type="email"
                margin="normal"
                value={registerForm.email}
                onChange={handleRegisterEmailChange}
                required
                error={!!errors.registerEmail}
                helperText={errors.registerEmail}
                disabled={isLoading}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                fullWidth
                label="Mật khẩu"
                type="password"
                margin="normal"
                value={registerForm.password}
                onChange={handlePasswordChange}
                required
                error={!!errors.password}
                helperText={errors.password}
                disabled={isLoading}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                fullWidth
                label="Xác nhận mật khẩu"
                type="password"
                margin="normal"
                value={registerForm.confirmPassword}
                onChange={handleConfirmPasswordChange}
                required
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
                disabled={isLoading}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                fullWidth
                variant="contained"
                color="primary"
                type="submit"
                sx={{ mt: 2 }}
                disabled={isLoading}
              >
                {isLoading ? 'Đang xử lý...' : 'Đăng ký'}
              </Button>
            </form>
          </TabPanel>
        </Box>
      </Modal>
    </>
  );
}; 