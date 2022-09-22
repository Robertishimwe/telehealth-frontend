import React from 'react';
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
import validationsPassword from '../../validation/emailValidation';

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

  return (
    <div className={classes.container} data-testid="fogMainContainer">
      <form onSubmit={handleSubmit} data-testid="regForm">
        <Card className={classes.card} data-testid="fogCard">
          <Typography
            data-testid="fogTitle"
            align="center"
            variant="h5"
            style={{
              color: colors.primaryColor,
              fontWeight: 'bolder',
              marginTop: '1em',
              marginBottom: `-1em`,
            }}
          >
            Forgot password
          </Typography>
          <CardContent>
            <p
              className="displayer"
              id="displayer"
              data-testid="fogdisplayer"
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
              data-testid="fogInputBox"
            />
          </CardContent>
          <CardActions className={classes.actions} data-testid="fogAction">
            <Button
              type="submit"
              data-testid="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting}
              onClick={handleSubmit}
              style={{
                backgroundColor: colors.primaryColor,
                minWidth: '400px',
              }}
            >
              Reset password
            </Button>
          </CardActions>
        </Card>
      </form>
    </div>
  );
};

const Form = withFormik({
  mapPropsToValues: ({ email }) => ({
    email: email || '',
  }),

  validationSchema: yup.object().shape(validationsPassword),

  handleSubmit: (values, { setSubmitting }) => {
    const { email } = values;

    api
      .post(
        `${process.env.REACT_APP_BACKENDI_URL}/api/users/send/forgot-password`,
        {
          email,
        }
      )
      .then(() => {
        const displayError = document.getElementsByClassName('displayer');
        displayError[0].innerText =
          "We've sent you an email with a link to reset your password";
        document.getElementById('displayer').style.backgroundColor =
          colors.displayerSucBack;
        document.getElementById('displayer').style.color =
          colors.displayerSucColor;
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
