import * as React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import {Grid} from '../loaders/Loader'
import api from '../../utility/api';

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export default function CustomizedAccordions() {
  const [expanded, setExpanded] = React.useState('panel1');
  const [historyData, setHistoryData] = React.useState()
  const { patientId } = useParams();

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };



  useEffect(() => {
    api.get(`/api/prescription/records/${patientId}`).then((res) => {
    setHistoryData(res?.data?.records)
    });
  }, []);



console.log("historyData",historyData)

  return (
    <div>
     {historyData? historyData.map((data,index)=> (
      <Accordion key={index} expanded={expanded === index} onChange={handleChange(index)}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>{data?.hospital?.hospitalName} - {data?.CreatedDate.split("T")[0]}</Typography>
        </AccordionSummary>
        <AccordionDetails>
           <table style={{ width: '100%' }}>
             <thead>
             <tr>
                 <td><b>Patient Name:</b></td>
                 <td>{data?.patient.firstName} {data?.patient.lastName}</td>
               </tr>
               <tr>
                 <td><b>Patient Email:</b></td>
                 <td>{data?.patient.email}</td>
               </tr>
               <tr>
                 <td><b>Hospital Name:</b></td>
                 <td>{data?.hospital?.hospitalName}</td>

               </tr>
             </thead>
             <tbody>
               <tr>
                 <td><b>Medication details:</b></td>
                 <td>{data?.medicationDetails}</td>
               </tr>

             </tbody>
           </table>

          {/*tesr */}




          <br />
          <br />
          <b>List of Prescribed Medication</b>
				<br />
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













        </AccordionDetails>
      </Accordion>
      ))
:<div style={{width:'80%', height:'60vh', display:'flex', justifyContent:'center', alignItems:'center'}}><Grid/></div>

     }



      {/* <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <Typography>Collapsible Group Item #2</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor
            sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
            sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion> */}
      {/* <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <Typography>Collapsible Group Item #3</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor
            sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
            sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion> */}
    </div>
  );
}
