import React from 'react'
import AdminAppointmentTable from '../components/patients/AppointmentsAdmin'
import PatientAppointmentTable from '../components/patients/AppointmentsPatients'
import PractitionerAppointmentTable from '../components/patients/AppointmentsPractitioner'
import HealthCenterAdminAppointmentTable from '../components/patients/AppointmentsHA'

import { useSelector } from 'react-redux';
import { thisUser } from '../redux/features/auth/loginSlice';

function ViewAppointment() {
const authenticated = useSelector(thisUser);
const Role = authenticated.user.payload.Role

console.log(Role)
  return (
    <>
    {Role === 'healthPractitioner' ? <PractitionerAppointmentTable/> : (Role === 'patient' ? <PatientAppointmentTable/> :(Role === 'hospitalAdmin' ? <HealthCenterAdminAppointmentTable/>: <AdminAppointmentTable/>))}
    </>
  )
}

export default ViewAppointment