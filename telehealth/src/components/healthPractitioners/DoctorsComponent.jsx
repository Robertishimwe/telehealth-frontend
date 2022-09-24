import React, {useState, useEffect} from 'react' 
import api from '../../utility/api';
import DoctorsCard from './doctorsCard'


function DoctorsComponent() {

const [healthPractitioners, sethealthPractitioners] = useState([])

useEffect(() => {

  api.get(`/api/users/healthPractitioners`)
    .then((res) => {
      sethealthPractitioners(res.data.users)
      console.log(res.data)
    })
    .catch((error)=>{
      console.log(error)
    })
}, [])






  return (
    <div style={{width:'90%', display:'flex', justifyContent:"space-evenly", margin:'auto', flexWrap: 'wrap' }}> 
        {healthPractitioners.map((healthPractitioner)=>(<DoctorsCard key={healthPractitioner._id} DoctorName={healthPractitioner.firstName} Specialization={healthPractitioner.specialization} id={healthPractitioner._id}/>))}
    </div>
  )
}

export default DoctorsComponent