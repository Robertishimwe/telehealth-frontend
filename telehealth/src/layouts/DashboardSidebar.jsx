/* eslint-disable global-require */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/require-default-props */
/* eslint-disable no-use-before-define */
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Box, Link, Drawer, Typography, Avatar, Stack } from '@mui/material';
//
import { useSelector } from 'react-redux';
import jwtDecode from 'jwt-decode';
// mock
import account from '../_mock/account';
// hooks
import useResponsive from '../hooks/useResponsive';
import Scrollbar from '../components/dashboard/Scrollbar';
import NavSection from '../components/dashboard/NavSection';
//
import navConfig from './NavConfig';
//
import { thisUser } from '../redux/features/auth/loginSlice';
import '../styles/roleFix.scss';

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    flexShrink: 0,
    width: DRAWER_WIDTH,
  },
}));

const AccountStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: theme.palette.grey[500_12],
}));

// ----------------------------------------------------------------------

DashboardSidebar.propTypes = {
  isOpenSidebar: PropTypes.bool,
  onCloseSidebar: PropTypes.func,
};

export default function DashboardSidebar({ isOpenSidebar, onCloseSidebar }) {
  const { pathname } = useLocation();

  const authenticated = useSelector(thisUser);

  const isDesktop = useResponsive('up', 'lg');

  // const { token } = authenticated.user.payload;
  const token = localStorage.getItem("token")

  const { firstname,lastName, Role, hospitalName } = jwtDecode(token);
 

  const fullName = Role =='hospitalAdmin' ? `${hospitalName}` : `${firstname} ${lastName}`;
  // const fullName = `${firstname} ${lastName}`;

  console.log("fullname", fullName)

  if (Role !== 'admin') {
    require('../styles/hideUser.scss');
  }

  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar();
    }
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': {
          height: 1,
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      <Box sx={{ px: 2.5, py: 3, display: 'inline-flex' }}>
        <Typography variant="h5" sx={{margin:'auto'}}>TOAS</Typography>
      </Box>

      <Box sx={{ mb: 5, mx: 2.5 }}>
        <Link underline="none" component={RouterLink} to="#">
          <AccountStyle>
            <Avatar src={account.photoURL} alt={firstname} />
            <Box sx={{ ml: 2 }}>
              <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
                {fullName || hospitalName}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {Role}
                {/* {user.roleId === 1
                  ? 'Requester'
                  : user.roleId === 2
                  ? 'Manager'
                  : user.roleId === 3
                  ? 'Admin'
                  : 'SuperAdmin'} */}
              </Typography>
            </Box>
          </AccountStyle>
        </Link>
      </Box>

      <NavSection navConfig={navConfig} />

      <Box sx={{ flexGrow: 1 }} />

      <Box sx={{ px: 2.5, pb: 3, mt: 10 }}>
        <Stack
          alignItems="center"
          spacing={3}
          sx={{ pt: 5, borderRadius: 2, position: 'relative' }}
        />
      </Box>
    </Scrollbar>
  );
  return (
    <RootStyle>
      {!isDesktop && (
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{
            sx: { width: DRAWER_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      )}

      {isDesktop && (
        <Drawer
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: DRAWER_WIDTH,
              bgcolor: 'background.default',
              borderRightStyle: 'dashed',
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </RootStyle>
  );
}
