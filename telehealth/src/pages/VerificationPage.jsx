/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Stack } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../components/verification/loaderContainer';

function VerificationPage() {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const urlElements = window.location.href.split('/');

  const token = urlElements[6].split('=')[1];

  useEffect(() => {
    const response = axios.get(
      `${process.env.REACT_APP_BACKENDI_URL}/api/users/verify/${token}`
    );
    response
      .then((res) => {
        setMessage(res.data.message);
      })
      .catch((err) => {
        err.response.data.error === 'jwt expired' ||
        err.response.data.error === 'Unauthorized' ||
        err.response.data.error === 'jwt malformed'
          ? setError('Token Expired Try To Request Another One')
          : setError(err.response.data.error);
      });
  }, []);

  return (
    <div>
      <Stack alignItems="center">
        {error.length === 0 && message.length === 0 ? (
          <Loader />
        ) : error.length > 0 ? (
          <ToastContainer>
            {toast.error(`${error} !`, {
              position: toast.POSITION.TOP_RIGHT,
            })}
          </ToastContainer>
        ) : (
          <ToastContainer>
            {toast.success(`${message} !`, {
              position: toast.POSITION.TOP_LEFT,
            })}
          </ToastContainer>
        )}
      </Stack>
    </div>
  );
}

export default VerificationPage;
