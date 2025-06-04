import React from 'react';
import { Box, Container, Typography, Link } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[900],
      }}
    >
      <Container maxWidth="sm">
        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1,
            flexWrap: 'wrap',
          }}
        >
          <span>© 2025</span>
          <Link
            href="https://nhutnm.id.vn"
            color="inherit"
            underline="hover"
            sx={{ fontWeight: 500 }}
          >
            nhutnm.id.vn
          </Link>
          <Link
            href="https://wa.me/84778938041"
            color="inherit"
            underline="hover"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              '&:hover': {
                color: '#25D366',
              },
            }}
          >
            <WhatsAppIcon sx={{ fontSize: 16 }} />
            0778938041
          </Link>
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer; 