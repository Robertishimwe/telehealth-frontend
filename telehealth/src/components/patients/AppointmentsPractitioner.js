
import React, { useEffect, useState } from 'react';
import MaterialTable from 'material-table';
import { useForm } from 'react-hook-form';
import { TablePagination } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import MedicationIcon from '@mui/icons-material/Medication';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import CancelIcon from '@mui/icons-material/Cancel';
import { ToastContainer, toast } from 'react-toastify';
import colors from '../../styles/colorVariables';
import myIcon from './MaterialTableIcons';
import 'react-toastify/dist/ReactToastify.css';
import '../../styles/roleFix.scss';
import api from '../../utility/api';

const options = [
  { name: 'Requester', value: 1 },
  { name: 'Manager', value: 2 },
  { name: 'Admin', value: 3 },
];
function ConfirmationDialogRaw(props) {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { onClose, value: valueProp, open, ...other } = props;
  const [value, setValue] = React.useState(valueProp);
  const radioGroupRef = React.useRef(null);

  React.useEffect(() => {
    if (!open) {
      setValue(valueProp);
    }
  }, [valueProp, open]);

  const handleEntering = () => {
    if (radioGroupRef.current != null) {
      radioGroupRef.current.focus();
    }
  };

  const handleCancel = () => {
    onClose();
  };

  const handleOk = async () => {
    const userId = localStorage.getItem('cui');

    await api
      .post(`/api/roles/assign/${userId}`, {
        RoleId: `${value}`,
      })
      .then(() => {
        toast.success('Role assigned successfully', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch((err) => {
        if (err) {
          toast.error('Role not assigned', {
            position: 'top-right',
            autoClose: 5000,
          });
        }
        toast.error('Role not assigned', {
          position: 'top-right',
          autoClose: 5000,
        });
      });
    onClose(value);
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const onSubmit = async (data) => {
    const patientid = JSON.parse(localStorage.getItem("patientId"))
    const appointment = JSON.parse(localStorage.getItem("cui"))
    const {medicationDetails,medicationName, purpose, Dosage, frequency,medicationName_1, purpose_1, Dosage_1, frequency_1,medicationName_2, purpose_2, Dosage_2, frequency_2} = data
    const prescribedMedications = []

    prescribedMedications.push({medicationName, purpose, Dosage, frequency})

    if(medicationName_1, purpose_1, Dosage_1, frequency_1) {
    prescribedMedications.push({medicationName:medicationName_1, purpose:purpose_1, Dosage:Dosage_1, frequency:frequency_1})
    }

    if(medicationName_2, purpose_2, Dosage_2, frequency_2){
    prescribedMedications.push({medicationName:medicationName_2, purpose:purpose_2, Dosage:Dosage_2, frequency:frequency_2})
    }

    const newData = {patient: patientid, medicationDetails,appointment, prescribedMedications}

    await api.post(`/api/prescription/add`, newData)
    .then((res)=>{
 
      toast.success("Prescription sent to patient", {
        position:'bottom-right',
        autoClose: 5000,
      })
      handleCancel()
    })
    .catch((err)=>{

      toast.error("Something went worng", {
        position:'bottom-right',
        autoClose: 5000,
      })
      
    })
  }

// console.log(errors)

  return (
    <Dialog
      sx={{ '& .MuiDialog-paper': { width: '60%', maxHeight: 435 } }}
      maxWidth="s"
      TransitionProps={{ onEntering: handleEntering }}
      open={open}
      {...other}
    >
      {/* <DialogTitle>Prescribe patient</DialogTitle>

      <DialogContent dividers> */}
      <div className="mainFormContainer" style={{width:'100%'}}>
      <div className="col-lg-24" style={{width:'100%'}}>
        <div className="bg-light text-center rounded p-5" style={{width:'100%'}}>
          <h2 className="mb-3">Prescribe patient</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row g-3">
              <div className="col-12 col-sm-12">
                <input type="text" className="form-control bg-white border-0" placeholder="Enter medication condition Details" style={{ height: 40 }} {...register("medicationDetails", { required: true, maxLength: 70, minLength: 10 })}/>
              </div>

              <div className="col-12 col-sm-12" style={{display: 'flex', justifyContent:'space-around'}}>
                <input type="text" className="form-control bg-white border-0" placeholder="Medication name" style={{ height: 40, width:'25%' }} {...register("medicationName", { required: true, maxLength: 70, minLength: 2 })}/>
                <input type="text" className="form-control bg-white border-0" placeholder="Purpose" style={{ height: 40, width:'25%' }} {...register("purpose", { required: true, maxLength: 50, minLength: 2 })}/>
                <input type="text" className="form-control bg-white border-0" placeholder="Dosage" style={{ height: 40,  width:'20%' }} {...register("Dosage", { required: true, maxLength: 40, minLength: 2 })}/>
                <input type="text" className="form-control bg-white border-0" placeholder="Frequency" style={{ height: 40,  width:'20%' }} {...register("frequency", { required: true, maxLength: 40, minLength: 2 })}/>
              </div>


              <div className="col-12 col-sm-12" style={{display: 'flex', justifyContent:'space-around'}}>
                <input type="text" className="form-control bg-white border-0" placeholder="Medication name" style={{ height: 40, width:'25%' }} {...register("medicationName_1", { required: false, maxLength: 40, minLength: 2 })}/>
                <input type="text" className="form-control bg-white border-0" placeholder="Purpose" style={{ height: 40, width:'25%' }}  {...register("purpose_1", { required: false, maxLength: 40, minLength: 2 })}/>
                <input type="text" className="form-control bg-white border-0" placeholder="Dosage" style={{ height: 40,  width:'20%' }}  {...register("Dosage_1", { required: false, maxLength: 40, minLength: 2 })}/>
                <input type="text" className="form-control bg-white border-0" placeholder="Frequency" style={{ height: 40,  width:'20%' }} {...register("frequency_1", { required: false, maxLength: 40, minLength: 2 })}/>
              </div>


              <div className="col-12 col-sm-12" style={{display: 'flex', justifyContent:'space-around'}}>
                <input type="text" className="form-control bg-white border-0" placeholder="Medication name" style={{ height: 40, width:'25%' }} {...register("medicationName_2", { required: false, maxLength: 40, minLength: 2 })}/>
                <input type="text" className="form-control bg-white border-0" placeholder="Purpose" style={{ height: 40, width:'25%' }} {...register("purpose_2", { required: false, maxLength: 40, minLength: 2 })}/>
                <input type="text" className="form-control bg-white border-0" placeholder="Dosage" style={{ height: 40,  width:'20%' }} {...register("Dosage_2", { required: false, maxLength: 40, minLength: 2 })}/>
                <input type="text" className="form-control bg-white border-0" placeholder="Frequency" style={{ height: 40,  width:'20%' }} {...register("frequency_2", { required: false, maxLength: 40, minLength: 2 })}/>
              </div>
              {/* <div className="col-12 col-sm-12">
                <input type="email" className="form-control bg-white border-0" placeholder="Enter hospital's email" style={{ height: 40 }} />
              </div>

              <div className="col-12 col-sm-12">
                <input type="password" className="form-control bg-white border-0" placeholder="Enter Password" style={{ height: 40 }} />
              </div> */}

              <div className="col-12" style={{display: 'flex', justifyContent:'space-between'}}>
                <button className="btn btn-primary w-50 py-2" type="submit" style={{width:"5%", maxWidth:"5"}}>Save</button>
                <button type="button" className="btn btn-primary w-50 py-2" autoFocus onClick={handleCancel} style={{width:"25%", backgroundColor:"red"}}>Cancel</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
        
        {/* <RadioGroup
          ref={radioGroupRef}
          aria-label="ringtone"
          name="ringtone"
          value={value}
          onChange={handleChange}
        >




        
          {options.map((option) => (
            <FormControlLabel
              value={option.value}
              key={option.value}
              control={<Radio />}
              label={option.name}
            />
          ))}
        </RadioGroup> */}
      {/* </DialogContent>
      <DialogActions>
        <Button type="button" autoFocus onClick={handleCancel}>
          Cancel
        </Button>
        <Button type="button" onClick={handleOk}>
          Prescribe
        </Button>
      </DialogActions> */}
    </Dialog>
  );
}

ConfirmationDialogRaw.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
};

// https://material-table.com/#/docs/get-started

const useStyles = makeStyles({});

export default function PractitionerAppointmentTable() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('Dione');

  const handleClickListItem = () => {
    setOpen(true);
  };

  const handleClose = (newValue) => {
    setOpen(false);

    if (newValue) {
      setValue(newValue);
    }
  };
  const classes = useStyles();

  const [dataa, setDataa] = useState([]);

  useEffect(() => {
    const renderState = async () => {
      const response = await api.get('/api/appointment/practioner/my-appointments');
      // console.log(">>>hello<<<",response.data.appointment)
      setDataa(response.data.appointment);
    };
    renderState();
  }, []);


const newDta = dataa.map((dataaa)=>{
    return {_id:dataaa._id, date:dataaa.date, time:dataaa.time,patientId: dataaa.patient._id, patient:`${dataaa.patient.firstName} ${dataaa.patient.lastName}`,discriptionOfsickness:dataaa.discriptionOfsickness, status:dataaa.status, conferanceLink:dataaa.conferanceLink,hospital:dataaa.hospital.hospitalName}
})

  const [state] = React.useState({
    columns: [
      { title: 'Patient', field: 'patient' },
      { title: 'Discription of sickiness', field:'discriptionOfsickness' },
      { title: 'Date', field: 'date' },
      { title: 'Time', field: 'time' },
      { title: 'Status', field:'status'}
    ],
  });


  return (
    <>
      <ToastContainer />
      <MaterialTable
        title="Appointments"
        icons={myIcon}
        columns={state.columns}
        data={newDta}
        options={{
          actionsColumnIndex: -1,
          search: true,
          sorting: false,

          headerStyle: {
            backgroundColor: colors.primaryColor,
            color: colors.secondaryColor,
          },
        }}
        actions={[
          {
            icon: MedicationIcon,
            iconProps: { style: { fontSize: '16px', color: 'green' } },
            tooltip: 'Prescribe',
            onClick: (event, rowData) => {
              const userId = rowData._id;
              localStorage.setItem('patientId', JSON.stringify(rowData.patientId));
              localStorage.setItem('cui', JSON.stringify(userId));
              handleClickListItem(userId);
            },
          },
          {
            icon: CancelIcon,
            iconProps: { style: { fontSize: '16px', color: 'green' } },
            tooltip: 'Cancel meeting',
            onClick: (event, rowData) => {
                const userId = rowData._id;
                localStorage.setItem('cui', JSON.stringify(userId));
                handleClickListItem(userId);
            },
          },
          {
            icon: VideoCallIcon,
            iconProps: { style: { fontSize: '16px', color: 'green' } },
            tooltip: 'join video call with health practitioner',
            onClick: (event, rowData) => {
              const VideoCallURL = rowData.conferanceLink;
              window.open(VideoCallURL)
            },
          },
          
        ]}
        components={{
          Pagination: (props) => (
            <TablePagination
              ActionsComponent={() => <div>hi...</div>}
              {...props}
              labelRowsPerPage={<div>{props.labelRowsPerPage}</div>}
              labelDisplayedRows={(row) => (
                <div style={{ color: 'green' }}>
                  {props.labelDisplayedRows(row)}
                </div>
              )}
              component="div"
              colSpan={props.colSpan}
              count={props.count}
              rowsPerPage={props.rowsPerPage}
              page={props.page}
              classes={{
                root: classes.root,
                toolbar: classes.toolbar,
                caption: classes.caption,
                selectIcon: classes.selectIcon,
                actions: classes.actions,
              }}
            />
          ),
        }}
      />{' '}
      <List component="div" role="group" data-testid="userTable">
        <ConfirmationDialogRaw
          id="ringtone-menu"
          keepMounted
          open={open}
          onClose={handleClose}
          value={value}
        />
      </List>
    </>
  );
}
