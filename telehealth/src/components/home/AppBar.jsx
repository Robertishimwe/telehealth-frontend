import * as React from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import AppBar from './AppBarLayout';
import Toolbar from './ToolBar';
import Theme from '../../styles/muiTheme';

const rightLink = {
  fontSize: 16,
  color: 'common.white',
  ml: 3,
};

function AppAppBar() {
  return (
    <div>
      <AppBar position="fixed" sx={{ bgcolor: Theme.bgcolor }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ flex: 1 }} />
          <Link
            variant="h6"
            underline="none"
            color="inherit"
            href="/"
            sx={{ fontSize: 24 }}
          >
            TOAS
          </Link>
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
            <Link
              color="inherit"
              variant="h6"
              underline="none"
              href="/login"
              sx={rightLink}
            >
              <Button
                sx={{ color: 'common.white' }}
                color="secondary"
                variant="outlined"
              >
                Login
              </Button>
            </Link>
            <Link
              variant="h6"
              underline="none"
              href="/registration"
              sx={{ ...rightLink, color: 'common.white' }}
            >
              <Button
                sx={{ color: 'common.white' }}
                color="secondary"
                variant="outlined"
              >
                Register
              </Button>
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </div>
  );
}

export default AppAppBar;
