import React from 'react';
import jwtDecode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { logginUser } from '../../redux/features/auth/loginSlice';
import { loginMode } from '../../redux/features/auth/isLoggedSlice';

function SocialAuth() {
  const dispatch = useDispatch();

  const vars = {};
  window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, (m, key, value) => {
    vars[key] = value;
  });

  const { token } = vars;
  const decoded = jwtDecode(token);
  localStorage.setItem('token', token);
  const user = { user: decoded.user, token };
  dispatch(logginUser(user));
  dispatch(loginMode());

  return <div>Loading....................</div>;
}

export default SocialAuth;
