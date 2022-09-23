import React from 'react';
import Button from '@mui/material/Button';

import DoctorsCard from '../healthPractitioners/doctorsCard';

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
	return (
		/// booking div
		<div
			style={{
				display: 'flex',
				flexWrap: 'wrap',
				justifyContent: 'space-between',
			}}
		>
			<div style={{ width: '100%', backgroundColor: '#EFF5F9' }}>
				<div className='col-12 col-sm-6' style={{ marginLeft: 12 }}>
					<br />
					<p>Discribe your sickness</p>
					<input
						type='text'
						className='form-control bg-white border-0'
						placeholder='how are you feeling?'
						style={{ height: 55 }}
					/>
					<br />
					<p>Choose your preferred date</p>
					<input
						type='date'
						className='form-control bg-white border-0'
						style={{ height: 55 }}
					/>
				</div>
				<br />
				<p style={{ marginLeft: 12 }}>Choose your preferred time slot</p>
				{slots.map((slot, index) => (
					<Button
						variant='contained'
						key={index}
						sx={{
							width: 20,
							marginLeft: 1,
							marginTop: 1,
							backgroundColor: '#13C5DD',
						}}
					>
						{slot.time}
					</Button>
				))}
			</div>
		</div>
	);
}

export default BookAppointment;
