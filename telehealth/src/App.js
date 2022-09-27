import React from 'react';
import { Route, Routes } from 'react-router-dom';

import PrivateRoute from './app/privateRoute';
import BounceRoute from './app/bounce';
import Login from './pages/login';
import Appointment from './pages/Appointment';
import Registration from './pages/registration';
import DashboardApp from './pages/DashboardApp';
import DashboardLayout from './layouts/index';
import HospitalTable from './components/patients/HospitalTable';
import PatientTable from './components/patients/PatientTable';
import VideoConference from './components/videoConference/VideoConference'
import PatientSignUpForm from './pages/PatientSignUpForm';
import HospitalSignUpForm from './pages/HospitalSignUpForm';
import HealthPractitioners from './pages/HealthPractitioners';
import PatientAppointmentTable from './components/patients/AppointmentsPatients'

import './css/bootstrap.min.css';
import './css/style.css';

import Home from './pages/Home';

function App() {
	return (
		<Routes>
			<Route path='/' element={<Home />} />
			<Route path='/health-practitioner' element={<HealthPractitioners />} />
			<Route path='/test' element={<PatientAppointmentTable />} />
			<Route path='/room/:roomId' element={<VideoConference />} />
			<Route element={<BounceRoute />}>
				<Route path='login' element={<Login />} />
				<Route path='registration' element={<Registration />} />
				<Route path='registration/patient' element={<PatientSignUpForm />} />
				<Route path='registration/hospital' element={<HospitalSignUpForm />} />
			</Route>
			<Route element={<PrivateRoute />}>
				<Route path='dashboard' element={<DashboardLayout />}>
					<Route path='app' element={<DashboardApp />} />
					<Route path='patients' element={<PatientTable />} />
					<Route path='hospitals' element={<HospitalTable />} />
					<Route path='appointments' element={<PatientAppointmentTable />} />
				</Route>
				<Route path='/appointment/:id' element={<Appointment />} />
			</Route>
		</Routes>
	);
}

export default App;
