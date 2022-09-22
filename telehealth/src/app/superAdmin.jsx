import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { thisUser } from '../redux/features/auth/loginSlice';

function SuperAdminRoute() {
  const authenticated = useSelector(thisUser);
  return authenticated.user.payload.user.roleId === 4 ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
}

export default SuperAdminRoute;
