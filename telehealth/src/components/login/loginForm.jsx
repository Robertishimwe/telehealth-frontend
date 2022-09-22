import jwtDecode from 'jwt-decode';
import Paper from '@mui/material/Paper';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import { withFormik } from 'formik';
import { useDispatch } from 'react-redux';
import {
  withStyles,
  Card,
  CardContent,
  CardActions,
  TextField,
  Typography,
  Button,
} from '@material-ui/core';
import { logginUser } from '../../redux/features/auth/loginSlice';
import { loginMode } from '../../redux/features/auth/isLoggedSlice';

import google from '../../asset/icons8-google.svg';
import facebook from '../../asset/icons8-facebook.svg';

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

const form = (props) => {
  const dispatch = useDispatch();
  const [email, setemail] = useState();

  const getEmail = (e) => {
    setemail(e.target.value);
  };
  const [password, setpassword] = useState();
  const getPassword = (e) => {
    setpassword(e.target.value);
  };
  const showPassword = () => {
    const x = document.getElementById('password');
    if (x.type === 'password') {
      x.type = 'text';
    } else {
      x.type = 'password';
    }
  };

  const googleFun = () => {
    window.open(
      `${process.env.REACT_APP_BACKENDI_URL}/api/auth/google`,
      '_blank'
    );
  };

  const facebookFun = () => {
    window.open(
      `${process.env.REACT_APP_BACKENDI_URL}/api/auth/facebook`,
      '_blank'
    );
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    api
      .post(`/api/auth/login`, {
        email,
        password,
      })
      .then((res) => {
        const token = res?.data?.body?.accessToken;
        const decoded = jwtDecode(token);
        const user = { user: decoded.user, token };
        localStorage.setItem('token', token);
        dispatch(logginUser(user));
        dispatch(loginMode());
      })
      .catch((err) => {
        const { error } = err?.response?.data;
        const displayError = document.getElementsByClassName('displayer');
        displayError[0].innerText = error || `something went wrong`;
      });
  };

  const { classes, values, touched, errors, isSubmitting, handleBlur } = props;

  return (
    <div className={classes.container}>
      <form onSubmit={handleSubmit} data-testid="loginForm">
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
            Sign in
          </Typography>
          <CardContent>
            <p className="displayer" />

            <TextField
              id="email"
              data-testid="email"
              label="Email"
              type="email"
              value={values.email}
              onChange={getEmail}
              onBlur={handleBlur}
              helperText={touched.email ? errors.email : ''}
              error={touched.email && Boolean(errors.email)}
              margin="dense"
              variant="outlined"
              fullWidth
            />

            <TextField
              id="password"
              data-testid="password"
              label="Password"
              type="password"
              value={values.password}
              onChange={getPassword}
              onBlur={handleBlur}
              helperText={touched.password ? errors.password : ''}
              error={touched.password && Boolean(errors.password)}
              margin="dense"
              variant="outlined"
              fullWidth
            />
            <FormControlLabel
              control={
                <Checkbox sx={{ marginLeft: '0.1em', display: 'inline' }} />
              }
              label="Show password"
              onClick={showPassword}
            />
            <Typography
              style={{
                color: colors.primaryColor,
                textAlign: 'center',
                display: 'inline',
                marginLeft: '5em',
              }}
            >
              <Link
                to="/forgot-password"
                style={{
                  textDecoration: 'none',
                  color: colors.primaryColor,
                }}
              >
                Forgot password?
              </Link>
            </Typography>
          </CardContent>
          <CardActions className={classes.actions}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting}
              onClick={handleSubmit}
              data-testid="submit"
              id="submit"
              style={{
                backgroundColor: colors.primaryColor,
                minWidth: '95%',
              }}
            >
              Login
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
            <Paper
              elevation={3}
              sx={{ backgroundImage: `url(${google})` }}
              onClick={googleFun}
            />
            <Paper
              elevation={3}
              sx={{ backgroundImage: `url(${facebook})` }}
              onClick={facebookFun}
            />
          </Box>
        </Card>
      </form>
    </div>
  );
};

const Form = withFormik({})(form);

export default withStyles(styles)(Form);
