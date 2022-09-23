import React from 'react'

import MainTopHeader from '../components/headers/MainTopHeader';
import SearchCompont from '../components/healthPractitioners/SearchCompont';
import DoctorsComponent from '../components/healthPractitioners/DoctorsComponent'


function HealthPractitioners() {
  return (
    <>
      <MainTopHeader />
      <SearchCompont/>
      <DoctorsComponent />
    </>
  )
}

export default HealthPractitioners