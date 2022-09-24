import React from 'react';
import { Route, Routes } from 'react-router-dom';

import PrivateRoute from './app/privateRoute';
import BounceRoute from './app/bounce';
import Login from './pages/login';
import Appointment from './pages/Appointment';
import Registration from './pages/registration';
import DashboardApp from './pages/DashboardApp';
import DashboardLayout from './layouts/index';
import PatientSignUpForm from './pages/PatientSignUpForm';
import HospitalSignUpForm from './pages/HospitalSignUpForm';
import HealthPractitioners from './pages/HealthPractitioners';

import './css/bootstrap.min.css';
import './css/style.css';

import Home from './pages/Home';

function App() {
	return (
		<Routes>
			<Route path='/' element={<Home />} />
			<Route path='/health-practitioner' element={<HealthPractitioners />} />
			<Route element={<BounceRoute />}>
				<Route path='login' element={<Login />} />
				<Route path='registration' element={<Registration />} />
				<Route path='registration/patient' element={<PatientSignUpForm />} />
				<Route path='registration/hospital' element={<HospitalSignUpForm />} />
			</Route>
			<Route element={<PrivateRoute />}>
				<Route path='dashboard' element={<DashboardLayout />}>
					<Route path='app' element={<DashboardApp />} />
				</Route>
				<Route path='/appointment/:id' element={<Appointment />} />
			</Route>
		</Routes>
	);
}

export default App;
