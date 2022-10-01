import React from 'react';
import { Route, Routes } from 'react-router-dom';

import PrivateRoute from './app/privateRoute';
import BounceRoute from './app/bounce';
import Login from './pages/login';
import NotFound from './pages/NotFound';
import Appointment from './pages/Appointment';
import Prescription from './pages/Prescription'
import Registration from './pages/registration';
import DashboardApp from './pages/DashboardApp';
import MedicalRecord from './pages/MedicalRecord'
import DashboardLayout from './layouts/index';
import HospitalTable from './components/patients/HospitalTable';
import PatientTable from './components/patients/PatientTable';
import VideoConference from './components/videoConference/VideoConference'
import PatientSignUpForm from './pages/PatientSignUpForm';
import HospitalSignUpForm from './pages/HospitalSignUpForm';
import HealthPractitioners from './pages/HealthPractitioners';
import CustomizedAccordions from './components/medicalHistory/Accordion';
import PatientAppointmentTable from './components/patients/AppointmentsHA'
import HealthPractitionerRegistration from './components/registration/healthPractionerRegistrantion';
import ViewAppointment from './pages/ViewAppointment'
import {Grid} from './components/loaders/Loader'

import './css/bootstrap.min.css';
import './css/style.css';

import Home from './pages/Home';

function App() {
	return (
		<Routes>
			<Route path='/' element={<Home />} />
			<Route path='/health-practitioner' element={<HealthPractitioners />} />
			<Route path='/prescription/:prescriptionId' element={<Prescription />} />
			<Route path='/test/:patientId' element={<CustomizedAccordions/>} />
			<Route path='*' element={<NotFound />} />
	
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
					<Route path='add-employee' element={<HealthPractitionerRegistration />} />
					<Route path='appointments' element={<ViewAppointment />} />
					<Route path='history/:patientId' element={<MedicalRecord/>} />
				</Route>
				<Route path='/appointment/:id' element={<Appointment />} />
				<Route path='/room/:roomId' element={<VideoConference />} />
				<Route path='/prescription/:prescriptionId' element={<VideoConference />} />
			</Route>
		</Routes>
	);
}

export default App;
