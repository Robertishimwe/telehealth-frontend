import React, { useEffect } from 'react';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { makeStyles } from '@material-ui/core/styles';
import { PermIdentity } from '@material-ui/icons';
import {
  Grid,
  Typography,
  CardActions,
  Button,
  MenuItem,
  TextField,
  Select,
  InputLabel,
} from '@material-ui/core';
import {
  getProfileData,
  updateProfileData,
  thisUser,
} from '../../redux/features/profile/profileSlice';
import api from '../../utility/api';

const useStyles = makeStyles((theme) => ({
  formWrapper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(8),
  },
  actions: {
    justifyContent: 'center',
    padding: '2rem',
    marginTop: theme.spacing(2),
  },
  save: {
    width: '8rem',
    marginRight: theme.spacing(12),
    border: '1px solid #3f51b5',
  },
  cancel: {
    width: '8rem',
    marginRight: theme.spacing(12),
    border: '1px solid #f50057',
  },
  container: {
    backgroundColor: '#fafafa',
    padding: '4rem',
    position: 'relative',
    top: '3%',
    left: '5%',
    width: '76%',
  },
  inputBtn: {
    width: '20rem',
  },
}));

function UserProfile() {
  const dispatch = useDispatch();

  useEffect(() => {
    const renderState = async () => {
      await api
        .get('/api/users/profile')
        .then((res) => {
          const profile = res.data.body;
          dispatch(getProfileData(profile));
        })
        .catch((err) => {
          toast.error(`${err}`, {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });
    };
    renderState();
  }, []);
  const { profile } = useSelector(thisUser);
  const { isComplete } = profile.payload;

  const handleChange = (e) => {
    dispatch(
      getProfileData({
        ...profile.payload,
        [e.target.name]: e.target.value,
      })
    );
  };

  const handleReset = (e) => {
    e.preventDefault();
    window.location.reload();
  };

  const handleComplete = async () => {
    const {
      gender,
      nationality,
      department,
      preferredLanguage,
      preferredCurrency,
      lineManager,
      address,
      phoneNumber,
      maritalStatus,
      dob,
    } = profile.payload;

    await api
      .put('/api/users/profile/complete', {
        gender,
        nationality,
        department,
        preferredLanguage,
        preferredCurrency,
        lineManager,
        address,
        phoneNumber,
        maritalStatus,
        dob,
      })
      .then((res) => {
        dispatch(updateProfileData(res.data.body));
        toast.success('Profile Completed Successfully', {
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
        if (err?.response.status === 422) {
          toast.error(`${err.response.data.error}`, {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else if (err?.response?.status === 500) {
          toast.error('Server Error', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else {
          toast.error(`Profile completion Failed! ${err}`, {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      });
  };

  const handleUpdate = async () => {
    const {
      gender,
      nationality,
      department,
      preferredLanguage,
      preferredCurrency,
      lineManager,
      address,
      phoneNumber,
      maritalStatus,
      dob,
    } = profile.payload;

    await api
      .patch('/api/users/profile/update', {
        gender,
        nationality,
        department,
        preferredLanguage,
        preferredCurrency,
        lineManager,
        address,
        phoneNumber,
        maritalStatus,
        dob,
      })
      .then((res) => {
        dispatch(updateProfileData(res.data.body));

        toast.success('Profile Updated Successfully', {
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
        if (!err?.response) {
          toast.error(`${err.response}`, {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else if (err.response?.status === 422) {
          toast.error(`${err.response.data.error}`, {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else {
          toast.error('Profile update Failed', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      });
  };

  const FORM_COMPLETE_VALIDATION = yup.object().shape({
    gender: yup
      .mixed()
      .oneOf(['male', 'female', 'prefer not say'])
      .required('Please Fill all the fields!'),
    nationality: yup.string().required('Please Fill all the fields!'),
    department: yup.string().required('Please Fill all the fields!'),
    address: yup.string().required('Please Fill all the fields!'),
    lineManager: yup.string().required('Please Fill all the fields!'),
    preferredLanguage: yup.string().required('Please Fill all the fields!'),
    preferredCurrency: yup.string().required('Please Fill all the fields!'),
    phoneNumber: yup
      .number()
      .integer()
      .typeError('Please enter a valid number')
      .required('Please Fill all the fields!'),
    maritalStatus: yup
      .mixed()
      .oneOf(['Single', 'Married', 'Widowed'])
      .required('Please Fill all the fields!'),
    dob: yup
      .date()
      .min('12-31-1800')
      .max('12-31-2010')
      .required('Please Fill all the fields!'),
  });

  const FORM_VALIDATION = yup.object().shape({
    gender: yup.mixed().oneOf(['male', 'female', 'prefer not say']),
    nationality: yup.string(),
    department: yup.string(),
    address: yup.string(),
    lineManager: yup.string(),
    preferredLanguage: yup.string(),
    preferredCurrency: yup.string(),
    phoneNumber: yup
      .number()
      .integer()
      .typeError('Please enter a valid number'),
    maritalStatus: yup.mixed().oneOf(['Single', 'Married', 'Widowed']),
    dob: yup.date().min('12-31-1800').max('12-31-2010'),
  });

  const classes = useStyles();
  return (
    <>
      <ToastContainer />
      <Formik
        initialValues={profile.payload}
        validationSchema={
          isComplete ? FORM_COMPLETE_VALIDATION : FORM_VALIDATION
        }
        onSubmit={!isComplete ? handleComplete : handleUpdate}
      >
        <Form
          className={classes.container}
          data-testid="profile-form"
          sx={{
            '& .MuiOutlinedInput-input': {
              width: '25rem',
            },
          }}
        >
          <Grid
            container
            spacing={2}
            sx={{
              color: 'red',
              '& .MuiGrid-container': { with: '300rem', color: 'red' },
            }}
          >
            <Grid
              item
              xs={12}
              style={{ textAlign: 'center', marginBottom: '2rem' }}
            >
              <PermIdentity
                style={{ width: '3rem', height: '3rem', color: '#3f51b5' }}
              />
              <Typography>Account Settings</Typography>
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                name="firstName"
                value={profile.payload.firstName}
                label="First Name"
                data-testid="firstName"
                className={classes.inputBtn}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                name="lastName"
                value={profile.payload.lastName}
                label="Last Name"
                data-testid="lastName"
                className={classes.inputBtn}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                name="email"
                value={profile.payload.email}
                label="Email"
                data-testid="email"
                className={classes.inputBtn}
              />
            </Grid>
            <Grid item xs={6}>
              <InputLabel id="Gender"> Gender </InputLabel>
              <Select
                defaultValue={profile.payload.gender}
                name="gender"
                onChange={handleChange}
                variant="outlined"
                labelId="Gender"
                data-testid="gender"
                className={classes.inputBtn}
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="prefer not say">Prefer not say</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                name="nationality"
                label="Nationality"
                data-testid="nationality"
                defaultValue={profile.payload.nationality}
                onChange={handleChange}
                className={classes.inputBtn}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                name="department"
                label="Department"
                data-testid="department"
                defaultValue={profile.payload.department}
                onChange={handleChange}
                className={classes.inputBtn}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                name="preferredLanguage"
                label="Preferred Language"
                data-testid="preferredLanguage"
                defaultValue={profile.payload.preferredLanguage}
                onChange={handleChange}
                className={classes.inputBtn}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                name="preferredCurrency"
                label="Preferred Currency"
                data-testid="preferredCurrency"
                defaultValue={profile.payload.preferredCurrency}
                onChange={handleChange}
                className={classes.inputBtn}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                name="lineManager"
                label="Line Manager"
                data-testid="lineManager"
                defaultValue={profile.payload.lineManager}
                onChange={handleChange}
                className={classes.inputBtn}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                name="address"
                label="Address"
                data-testid="address"
                defaultValue={profile.payload.address}
                onChange={handleChange}
                className={classes.inputBtn}
              />
            </Grid>
            <Grid item xs={6}>
              <InputLabel id="Marital-Status"> Marital Status</InputLabel>
              <Select
                defaultValue={profile.payload.maritalStatus}
                name="maritalStatus"
                onChange={handleChange}
                variant="outlined"
                id="Marital-Status"
                labelId="Marital-Status"
                data-testid="maritalStatus"
                className={classes.inputBtn}
              >
                <MenuItem value="Single">Single</MenuItem>
                <MenuItem value="Married">Married</MenuItem>
                <MenuItem value="Widowed">Widowed</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                name="phoneNumber"
                label="Phone Number"
                data-testid="phoneNumber"
                defaultValue={profile.payload.phoneNumber}
                onChange={handleChange}
                className={classes.inputBtn}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="date"
                data-testid="dob"
                label="Date of Birth"
                type="date"
                name="dob"
                className={classes.inputBtn}
                defaultValue={profile.payload.dob}
                format="yyyy/MM/dd"
                min="1900-12-31"
                max="2010-12-31"
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} center>
              <CardActions className={classes.actions}>
                <Button
                  id="save"
                  typeof="submit"
                  color="primary"
                  variant="contained"
                  className={classes.save}
                  onClick={isComplete ? handleUpdate : handleComplete}
                >
                  {isComplete ? 'UPDATE' : 'COMPLETE'}
                </Button>

                <Button
                  typeof="button"
                  color="secondary"
                  className={classes.cancel}
                  onClick={handleReset}
                >
                  CANCEL
                </Button>
              </CardActions>
            </Grid>
          </Grid>
        </Form>
      </Formik>
    </>
  );
}

export default UserProfile;
