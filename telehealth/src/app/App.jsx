import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/index';
import Registration from './pages/registration';
import Unverified from './pages/unverified';
import Welcome from './components/Welcome';
import PrivateRoute from './app/privateRoute';
import BounceRoute from './app/bounce';
import SuperAdminRoute from './app/superAdmin';
import Login from './pages/login';
import SocialAuth from './components/login/socialAuth';
import './styles/app.scss';
import ForgetPassword from './pages/forgetPassword';
import ResetPassword from './pages/resetPassword';
import DashboardLayout from './layouts';
import DashboardApp from './pages/DashboardApp';
import Users from './pages/Users';
import Accommodations from './pages/Accommodations';
import Accomodation from './pages/accommodation';
import Chat from './pages/Chat';
import Profile from './pages/Profile';
import TripRequest from './pages/TripRequest';
import VerificationPage from './pages/VerificationPage';
import Product from './components/accommodation/productPage';
// import Role from './pages/role';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="unverified" element={<Unverified />} />
      <Route path="welcome" element={<Welcome />} />
      <Route element={<BounceRoute />}>
        <Route path="login" element={<Login />} />
        <Route path="social-auth" element={<SocialAuth />} />
        <Route path="registration" element={<Registration />} />
      </Route>
      <Route element={<PrivateRoute />}>
        <Route path="dashboard" element={<DashboardLayout />}>
          <Route path="app" element={<DashboardApp />} />
          <Route path="accomodation/:id" element={<Accomodation />} />
          <Route element={<SuperAdminRoute />}>
            <Route path="users" element={<Users />} />
          </Route>
          <Route path="accommodations" element={<Accommodations />} />
          <Route path="chat" element={<Chat />} />
          <Route path="profile" element={<Profile />} />
          <Route path="trip-request" element={<TripRequest />} />
        </Route>
      </Route>
      <Route path="reset-password" element={<ResetPassword />} />
      <Route path="forgot-password" element={<ForgetPassword />} />
      <Route path="registration" element={<Registration />} />
      <Route path="welcome" element={<Welcome />} />
      <Route path="api/users/verify/" element={<VerificationPage />} />
      <Route path="products/:id" element={<Product />} />
      {/* <Route path="role" element={<Role />} /> */}
    </Routes>
  );
}

export default App;
