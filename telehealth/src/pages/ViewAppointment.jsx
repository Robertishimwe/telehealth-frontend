import React from 'react'
import PatientAppointmentTable from '../components/patients/AppointmentsPatients'
import PractitionerAppointmentTable from '../components/patients/AppointmentsPractitioner' 

import { useSelector } from 'react-redux';
import { thisUser } from '../redux/features/auth/loginSlice';

function ViewAppointment() {
const authenticated = useSelector(thisUser);
const Role = authenticated.user.payload.Role

console.log(Role)
  return (
    <>
    {Role === 'healthPractitioner' ? <PractitionerAppointmentTable/> : <PatientAppointmentTable/>}
    </>
  )
}

export default ViewAppointment