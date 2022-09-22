import Paper from '@mui/material/Paper';
import React from 'react';
import Box from '@mui/material/Box';
import * as yup from 'yup';

import { withFormik } from 'formik';

import {
  withStyles,
  Card,
  CardContent,
  CardActions,
  TextField,
  Typography,
  Button,
} from '@material-ui/core';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import google from '../../asset/icons8-google.svg';
import facebook from '../../asset/icons8-facebook.svg';
import validationsForm from '../../validation/registrationValidation';

import '../../styles/registration.scss';
import colors from '../../styles/colorVariables';

import api from '../../utility/api';

const styles = () => ({
  card: {
    maxWidth: 420,
    marginTop: 100,
  },
  container: {
    display: 'Flex',
    justifyContent: 'center',
  },
  actions: {
    justifyContent: 'center',
  },
});
const showPassword = () => {
  const x = document.getElementById('password');
  if (x.type === 'password') {
    x.type = 'text';
  } else {
    x.type = 'password';
  }
};

const form = (props) => {
  const {
    classes,
    values,
    touched,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
  } = props;

  return (
    <div className={classes.container}>
      <form onSubmit={handleSubmit} data-testid="regForm">
        <Card className={classes.card}>
          <Typography
            data-testid="title"
            align="center"
            variant="h5"
            style={{
              color: colors.primaryColor,
              fontWeight: 'bolder',
              marginTop: '1em',
              marginBottom: `-1em`,
            }}
          >
            Create account
          </Typography>
          <CardContent>
            <p className="displayer" />
            <TextField
              id="firstName"
              label="First Name"
              value={values.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={touched.firstName ? errors.firstName : ''}
              error={touched.firstName && Boolean(errors.firstName)}
              margin="dense"
              variant="outlined"
              fullWidth
            />
            <TextField
              id="lastName"
              label="Last Name"
              value={values.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={touched.lastName ? errors.lastName : ''}
              error={touched.lastName && Boolean(errors.lastName)}
              margin="dense"
              variant="outlined"
              fullWidth
            />
            <TextField
              id="userName"
              label="User Name"
              value={values.userName}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={touched.userName ? errors.userName : ''}
              error={touched.userName && Boolean(errors.userName)}
              margin="dense"
              variant="outlined"
              fullWidth
            />
            <TextField
              id="email"
              label="Email"
              type="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={touched.email ? errors.email : ''}
              error={touched.email && Boolean(errors.email)}
              margin="dense"
              variant="outlined"
              fullWidth
            />

            <TextField
              id="password"
              label="Password"
              type="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={touched.password ? errors.password : ''}
              error={touched.password && Boolean(errors.password)}
              margin="dense"
              variant="outlined"
              fullWidth
            />
            <FormControlLabel
              control={<Checkbox sx={{ marginLeft: '0.1em' }} />}
              label="Show password"
              onClick={showPassword}
            />
          </CardContent>
          <CardActions className={classes.actions}>
            <Button
              data-testid="submit"
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting}
              style={{
                backgroundColor: colors.primaryColor,
                minWidth: '95%',
              }}
            >
              Create account
            </Button>
          </CardActions>

          <Typography
            style={{
              color: colors.primaryColor,
              textAlign: 'center',
            }}
          >
            Or continue with
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap',
              '& > :not(style)': {
                m: 1,
                width: 50,
                height: 50,
              },
            }}
          >
            <Paper elevation={3} sx={{ backgroundImage: `url(${google})` }} />
            <Paper elevation={3} sx={{ backgroundImage: `url(${facebook})` }} />
          </Box>
        </Card>
      </form>
    </div>
  );
};

const Form = withFormik({
  mapPropsToValues: ({ firstName, lastName, userName, email, password }) => ({
    firstName: firstName || '',
    lastName: lastName || '',
    userName: userName || '',
    email: email || '',
    password: password || '',
  }),

  validationSchema: yup.object().shape(validationsForm),

  handleSubmit: (values, { setSubmitting }) => {
    api
      .post('/api/auth/register', values)
      .then((res) => {
        if (res.status === 200) {
          window.location.replace('/unverified');
        }
      })
      .catch((err) => {
        const { error } = err.response.data;
        const displayError = document.getElementsByClassName('displayer');
        displayError[0].innerText = error;
        setSubmitting(false);
      });
  },
})(form);

export default withStyles(styles)(Form);
