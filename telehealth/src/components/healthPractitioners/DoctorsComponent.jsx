import React, {useState, useEffect} from 'react' 
import api from '../../utility/api';
import { useSelector } from 'react-redux';
import { searchQuery } from '../../redux/features/search/searchQuerySlice';
import DoctorsCard from './doctorsCard'


function DoctorsComponent() {

const [healthPractitioners, sethealthPractitioners] = useState([])
const [searchQ, setSearchQ] = useState(healthPractitioners)
const querys = useSelector(searchQuery);


//update search query
useEffect(() => {

  setSearchQ(querys?.payload?.searchQuery?.query?.payload)

}, [querys])


// get data from database
useEffect(() => {

  api.get(`/api/users/healthPractitioners`)
    .then((res) => {
      /////
      const newDta = res.data.users.map((data)=>{
        return {_id:data._id, name:`${data.firstName} ${data.lastName}`, workPlace:data.workPlace.hospitalName, specialization:data.specialization, email:data.email, profilePicture:data.profilePicture}
    })
      ////
      sethealthPractitioners(newDta)
    })
    .catch((error)=>{
      console.log(error)
    })
}, [])

////////////


// filter
const keys = ["name","workPlace","specialization", "email"];

const search = (di) => {
  return healthPractitioners.filter((item) =>
    keys.some((key) => item[key].toLowerCase().includes(searchQ))
  );
};

const list = search(healthPractitioners)
console.log(list)

  return (
    <div style={{width:'90%', display:'flex', justifyContent:"space-evenly", margin:'auto', flexWrap: 'wrap' }}> 
        {list.map((healthPractitioner)=>(<DoctorsCard key={healthPractitioner._id} DoctorName={healthPractitioner.name} Specialization={healthPractitioner.specialization} id={healthPractitioner._id} email={healthPractitioner} workPlace={healthPractitioner.workPlace} profilePicture={healthPractitioner?.profilePicture}/>))}
    </div>
  )
}

export default DoctorsComponent
