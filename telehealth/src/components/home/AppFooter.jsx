/* eslint-disable react/forbid-prop-types */
import React from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

function Footer() {
  return (
    <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
      <Typography
        variant="subtitle1"
        align="center"
        color="text.secondary"
        component="p"
      >
        Barefoot Nomad
      </Typography>
      <Typography variant="body2" color="text.secondary" align="center">
        Copyright ©
        <Link color="inherit" href="/">
          Barefoot Nomad
        </Link>{' '}
        {new Date().getFullYear()}.
      </Typography>
    </Box>
  );
}

export default Footer;
