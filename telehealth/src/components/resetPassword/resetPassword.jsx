import React, { useEffect, useState } from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import jwtDecode from 'jwt-decode';
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
import validationsPassword from '../../validation/resetValidation';

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
  const [email, setemail] = useState(null);
  const [tokenExp, settokenExp] = useState(null);
  const [sentEmail, setsentEmail] = useState(false);

  useEffect(() => {
    const vars = {};
    window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, (m, key, value) => {
      vars[key] = value;
    });

    const { token } = vars;

    if (token) {
      const decoded = jwtDecode(token);
      const { exp } = decoded;
      const now = new Date().getTime() / 1000;
      if (exp > now) {
        settokenExp(true);
        setemail(decoded.user.email);
      }
      setemail(decoded.user.email);
    }
  });

  const resend = async () => {
    api
      .post(
        `${process.env.REACT_APP_BACKENDI_URL}/api/users/send/forgot-password`,
        {
          email,
        }
      )
      .then(() => {
        setsentEmail(true);
        settokenExp(true);
      })
      .catch(() => {
        setsentEmail(false);
      });
  };

  return (
    <div className={classes.container}>
      <form onSubmit={handleSubmit} data-testid="resForm">
        <Card className={classes.card}>
          {sentEmail ? (
            <Stack
              onClick={resend}
              align="center"
              sx={{ width: '100%' }}
              spacing={2}
            >
              <Alert variant="filled" severity="success">
                email sent successfully — check your inbox!
              </Alert>
            </Stack>
          ) : null}
          {!tokenExp ? (
            <Stack align="center" sx={{ width: '100%' }} spacing={2}>
              <Alert className="resend" variant="filled" severity="warning">
                Your reset link is expired — click{' '}
                <button type="button" className="resendbtn" onClick={resend}>
                  here
                </button>{' '}
                to resend it
              </Alert>
            </Stack>
          ) : null}
          <Typography
            align="center"
            variant="h5"
            style={{
              color: colors.primaryColor,
              fontWeight: 'bolder',
              marginTop: '1em',
              marginBottom: `-1em`,
            }}
          >
            Reset your password
          </Typography>

          <CardContent>
            <p className="displayer" id="displayer" />

            <TextField
              id="password"
              label="New Password"
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
            <TextField
              id="confirmPassword"
              label="Confirm Password"
              type="password"
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={touched.confirmPassword ? errors.confirmPassword : ''}
              error={touched.confirmPassword && Boolean(errors.confirmPassword)}
              margin="dense"
              variant="outlined"
              fullWidth
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
              RESET PASSWORD
            </Button>
          </CardActions>
        </Card>
      </form>
    </div>
  );
};

const Form = withFormik({
  mapPropsToValues: ({ confirmPassword, password }) => ({
    confirmPassword: confirmPassword || '',
    password: password || '',
  }),

  validationSchema: yup.object().shape(validationsPassword),

  handleSubmit: (values, { setSubmitting }) => {
    const vars = {};
    window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, (m, key, value) => {
      vars[key] = value;
    });

    const { token } = vars;

    api
      .post(
        `${process.env.REACT_APP_BACKENDI_URL}/api/users/reset-password/${token}`,
        values
      )
      .then(() => {
        const displayError = document.getElementsByClassName('displayer');
        displayError[0].innerText =
          'Your password has been reseted. login to continue';
        document.getElementById('displayer').style.backgroundColor =
          colors.displayerSucBack;
        document.getElementById('displayer').style.color =
          colors.displayerSucColor;
        setTimeout(() => {
          window.location.href = '/login';
        }, 3000);

        setSubmitting(false);
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
