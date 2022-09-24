import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Button from '@mui/material/Button';

import CustomizedDialogs from '../model/PopModel'; 
import api from '../../utility/api';

const slots = [
	{ slotId: 1, time: '08:00-08:30' },
	{ slotId: 2, time: '08:30-09:00' },
	{ slotId: 3, time: '09:00-09:30' },
	{ slotId: 4, time: '09:30-10:00' },
	{ slotId: 5, time: '10:00-10:30' },
	{ slotId: 6, time: '11:00-11:30' },
	{ slotId: 7, time: '11:30-12:00' },
	{ slotId: 8, time: '12:00-12:30' },
	{ slotId: 9, time: '12:30-01:00' },
	{ slotId: 10, time: '02:00-02:30' },
	{ slotId: 11, time: '02:30-03:00' },
	{ slotId: 12, time: '03:00-03:30' },
	{ slotId: 13, time: '03:30-04:00' },
	{ slotId: 14, time: '04:00-04:30' },
	{ slotId: 15, time: '04:30-05:00' },
];

function BookAppointment() {
  const { id } = useParams();
  const [openModel, setopenModel] = useState(false)
  const [date, setDate ] = useState('');
	const [Time, setTime] = useState('');

	const { register, handleSubmit, formState: { errors }} = useForm();
	const onSubmit = (data) => {

    setDate(data.date)
    const appointment = {
      healthPractional: id,
      discriptionOfsickness: data.discriptionOfsickness,
      date: data.date,
      time: Time
    }

      api.post(`/api/appointment/booking`,appointment)
        .then((res) => {
          console.log(res.data)
          setopenModel(true)
         
        })
        .catch((err)=>{
          toast.error((err?.response?.data.error) ? err?.response?.data.error : err?.response?.data.Message, {
            position:'bottom-right',
            autoClose: 5000,
          })
          console.log(err)
        })
   
    
		console.log(appointment);

	};

  
	console.log(errors);

	return (
	
		<div
			style={{
				display: 'flex',
				flexWrap: 'wrap',
				justifyContent: 'space-between',
			}}
		>
      {openModel ? <CustomizedDialogs date={date} time={Time}/> :null }
			<div style={{ width: '100%', backgroundColor: '#EFF5F9', display:"flex", justifyContent:"center", flexWrap:"wrap" }}>
				<form onSubmit={handleSubmit(onSubmit)}>
    <div style={{boarder: 1, boarderColo:"red"}}>
					<div className='col-12 col-sm-6' style={{ marginLeft: 12 }}>
						<br />
						<p>Discribe your sickness</p>
						<input
							type='text'
							className='form-control bg-white border-0'
							placeholder='how are you feeling?'
							style={{ height: 55 }}
							{...register('discriptionOfsickness', {
								required: true,
								minLength: 60,
								maxLength: 90,
							})}
						/>
						<br />
						<p>Choose your preferred date</p>
						<input
							type='date'
							className='form-control bg-white border-0'
							style={{ height: 55 }}
							{...register('date', { required: true })}
						/>
					</div>
					<br />
					<p style={{ marginLeft: 12 }}>Choose your preferred time slot</p>
          </div>
     <div style={{ width:'50%', display: 'flex', justifyContent:'center', flexWrap:'wrap'}}>
					<Button
            onClick={()=>setTime(slots[0].time)}
						type='submit'
						variant='contained'
						sx={{
							width: 20,
							marginLeft: 1,
							marginTop: 1,
							backgroundColor: '#13C5DD',
						}}
					>
						{slots[0].time}
					</Button>

{/*end of 1 btn*/}
          <Button
           onClick={()=>setTime(slots[1].time)}
						type='submit'
						variant='contained'
						sx={{
							width: 20,
							marginLeft: 1,
							marginTop: 1,
							backgroundColor: '#13C5DD',
						}}
					>
						{slots[1].time}
					</Button>

          <Button
           onClick={()=>setTime(slots[2].time)}
						type='submit'
						variant='contained'
						value={slots[2].time}
						sx={{
							width: 20,
							marginLeft: 1,
							marginTop: 1,
							backgroundColor: '#13C5DD',
						}}
					>
						{slots[2].time}
					</Button>


          <Button
           onClick={()=>setTime(slots[3].time)}
						type='submit'
						variant='contained'
						value={slots[3].time}
						sx={{
							width: 20,
							marginLeft: 1,
							marginTop: 1,
							backgroundColor: '#13C5DD',
						}}
					>
						{slots[3].time}
					</Button>

          <Button
           onClick={()=>setTime(slots[4].time)}
						type='submit'
						variant='contained'
						value={slots[4].time}
						sx={{
							width: 20,
							marginLeft: 1,
							marginTop: 1,
							backgroundColor: '#13C5DD',
						}}
					>
						{slots[4].time}
					</Button>

          <Button
           onClick={()=>setTime(slots[5].time)}
						type='submit'
						variant='contained'
						value={slots[5].time}
						sx={{
							width: 20,
							marginLeft: 1,
							marginTop: 1,
							backgroundColor: '#13C5DD',
						}}
					>
						{slots[5].time}
					</Button>

          <Button
           onClick={()=>setTime(slots[6].time)}
						type='submit'
						variant='contained'
						value={slots[6].time}
						sx={{
							width: 20,
							marginLeft: 1,
							marginTop: 1,
							backgroundColor: '#13C5DD',
						}}
					>
						{slots[6].time}
					</Button>

          <Button
           onClick={()=>setTime(slots[7].time)}
						type='submit'
						variant='contained'
						value={slots[7].time}
						sx={{
							width: 20,
							marginLeft: 1,
							marginTop: 1,
							backgroundColor: '#13C5DD',
						}}
					>
						{slots[7].time}
					</Button>


          <Button
           onClick={()=>setTime(slots[8].time)}
						type='submit'
						variant='contained'
						value={slots[8].time}
						sx={{
							width: 20,
							marginLeft: 1,
							marginTop: 1,
							backgroundColor: '#13C5DD',
						}}
					>
						{slots[8].time}
					</Button>

          <Button
           onClick={()=>setTime(slots[9].time)}
						type='submit'
						variant='contained'
						value={slots[9].time}
						sx={{
							width: 20,
							marginLeft: 1,
							marginTop: 1,
							backgroundColor: '#13C5DD',
						}}
					>
						{slots[9].time}
					</Button>

          <Button
           onClick={()=>setTime(slots[10].time)}
						type='submit'
						variant='contained'
						sx={{
							width: 20,
							marginLeft: 1,
							marginTop: 1,
							backgroundColor: '#13C5DD',
						}}
					>
						{slots[10].time}
					</Button>

          <Button
           onClick={()=>setTime(slots[11].time)}
						type='submit'
						variant='contained'
						value={slots[11].time}
						sx={{
							width: 20,
							marginLeft: 1,
							marginTop: 1,
							backgroundColor: '#13C5DD',
						}}
					>
						{slots[11].time}
					</Button>

          <Button
           onClick={()=>setTime(slots[12].time)}
						type='submit'
						variant='contained'
						value={slots[12].time}
						sx={{
							width: 20,
							marginLeft: 1,
							marginTop: 1,
							backgroundColor: '#13C5DD',
						}}
					>
						{slots[12].time}
					</Button>


          <Button
           onClick={()=>setTime(slots[13].time)}
						type='submit'
						variant='contained'
						value={slots[13].time}
						sx={{
							width: 20,
							marginLeft: 1,
							marginTop: 1,
							backgroundColor: '#13C5DD',
						}}
					>
						{slots[13].time}
					</Button>

          <Button
            onClick={()=>setTime(slots[14].time)}
						type='submit'
						variant='contained'
						value={slots[14].time}
						sx={{
							width: 20,
							marginLeft: 1,
							marginTop: 1,
							backgroundColor: '#13C5DD',
						}}
					>
						{slots[14].time}
					</Button>
          </div>
				</form>
			</div>
		</div>
	);
}

export default BookAppointment;
