import React from 'react' 
import DoctorsCard from './doctorsCard'

function DoctorsComponent() {
  return (
    <div style={{width:'90%', display:'flex', justifyContent:"space-evenly", margin:'auto', flexWrap: 'wrap' }}>
        
        <DoctorsCard/>
        <DoctorsCard/>
        <DoctorsCard/>
        <DoctorsCard/>
        <DoctorsCard/>
        <DoctorsCard/>
        <DoctorsCard/>
        <DoctorsCard/>
        <DoctorsCard/>
        {/* <DoctorsCard/> */}
       
        {/* <DoctorsCard/>
        <DoctorsCard/> */}

    </div>
  )
}

export default DoctorsComponent