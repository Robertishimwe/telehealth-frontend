import React from 'react';
import { Route, Routes } from 'react-router-dom';

import PrivateRoute from './app/privateRoute';
import BounceRoute from './app/bounce';
import Login from './pages/login'
import Registration from './pages/registration'


import Home from './pages/Home'


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route element={<BounceRoute />}>
        <Route path="login" element={<Login />} />
        <Route path="registration" element={<Registration />} />
      </Route>
    </Routes>
  );
}

export default App;
