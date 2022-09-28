
import React, { useEffect, useState } from 'react';
import MaterialTable from 'material-table';
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
  return (
    <Dialog
      sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
      maxWidth="xs"
      TransitionProps={{ onEntering: handleEntering }}
      open={open}
      {...other}
    >
      <DialogTitle>User Roles</DialogTitle>

      <DialogContent dividers>
        <RadioGroup
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
        </RadioGroup>
      </DialogContent>
      <DialogActions>
        <Button type="button" autoFocus onClick={handleCancel}>
          Cancel
        </Button>
        <Button type="button" onClick={handleOk}>
          Assign
        </Button>
      </DialogActions>
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
      const response = await api.get('/api/appointment/health-center/my-appointments');
      console.log(">>>hello<<<",response.data.appointment)
      setDataa(response.data.appointment);
    };
    renderState();
  }, []);


const newDta = dataa.map((dataaa)=>{
    return {_id:dataaa._id, date:dataaa.date, time:dataaa.time, patient:`${dataaa.patient.firstName} ${dataaa.patient.lastName}`,discriptionOfsickness:dataaa.discriptionOfsickness, status:dataaa.status, conferanceLink:dataaa.conferanceLink,hospital:dataaa.hospital.hospitalName}
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
            icon: ManageAccountsIcon,
            iconProps: { style: { fontSize: '16px', color: 'green' } },
            tooltip: 'Block user',
            onClick: (event, rowData) => {
              const userId = rowData._id;
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
