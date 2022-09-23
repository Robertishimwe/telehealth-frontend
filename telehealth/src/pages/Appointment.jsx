import React from 'react'
import MainTopHeader from '../components/headers/MainTopHeader';
import BookAppointment from '../components/appointment/BookAppointment'

function Appointment() {
  return (
    <div>
        <MainTopHeader/>
        <h1 class="display-10" >Book Appointment</h1>
        <BookAppointment/>
    </div>
  )
}

export default Appointment