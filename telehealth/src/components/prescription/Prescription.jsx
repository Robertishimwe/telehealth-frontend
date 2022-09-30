import React, { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom';
import html2pdf from 'html2pdf.js'
import api from '../../utility/api';
import '../../styles/prescription.scss'

function PrescriptionComponent() {
  const [data, setdata] = useState("loading......") 
  const { prescriptionId } = useParams();

  useEffect(() => {
    api
      .get(`/api/prescription/thisprescription/${prescriptionId}`)
      .then((res) => {
        setdata(res.data.prescription[0])
     
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const element = document.getElementById('main-container');

  const print =()=>{
    html2pdf().from(element).save();
  }

  return (
		<>
			<div class='Printbtn'>
				<button
					type='button'
					class='btn btn-secondary btn-lg'
					onClick={print}
				>
					Print
				</button>
			</div>
			<div class='main-container' id='main-container'>
				<b>Prescription info</b>
				<br />
				<table>
					<tbody>
						<tr>
							<td className='prime'>Prescription Date: </td>
							<td> {data?.CreatedDate}</td>
						</tr>
						<tr>
							<td className='prime'>Prescription Id: </td>
							<td>{data?._id}</td>
						</tr>
					</tbody>
				</table>
				<br />

				<b>Patient info</b>
				<br />
				<table>
					<tbody>
						<tr>
							<td className='prime'>Name: </td>
							<td>
								{data?.patient?.firstName} {data?.patient?.lastName}
							</td>
						</tr>

						<tr>
							<td className='prime'>Email:</td>
							<td>{data?.patient?.email}</td>
						</tr>
					</tbody>
				</table>
				<br />
				<b>List of Prescribed Medication</b>
				<br />

				<table class='table table-striped'>
					<thead>
						<tr>
							<th scope='col'>Medication Name</th>
							<th scope='col'>Purpose</th>
							<th scope='col'>Dosage</th>
							<th scope='col'>Frequency</th>
						</tr>
					</thead>
					<tbody>

						{data?.prescribedMedications?.map((singleRow, index) => (
							<tr key={index}>
								<td>{singleRow.medicationName}</td>
                <td>{singleRow.purpose}</td>
								<td>{singleRow.Dosage}</td>
                <td>{singleRow.frequency}</td>
							</tr>
						))}
						
					</tbody>
				</table>
				<br />
				<div>
					<div class='Pfooter'>
						<p>Health practioner's name</p>
						<p>
							{data?.healthPractional?.firstName}{' '}
							{data?.healthPractional?.lastName}
						</p>
					</div>
					<div class='Pfooter'>
						<p>Health center</p>
						<p>{data?.hospital?.hospitalName}</p>
					</div>
					<div class='Pfooter'>
						<p>Health email</p>
						<p>{data?.hospital?.email}</p>
					</div>
				</div>
			</div>
		</>
	);
}

export default PrescriptionComponent