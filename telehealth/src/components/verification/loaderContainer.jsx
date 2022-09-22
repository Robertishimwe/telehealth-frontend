/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-expressions */
import React from 'react';
import { CircularProgress, Stack, Typography } from '@mui/material';

function Loader() {
  return (
    <Stack alignItems="center" sx={{ mt: 4 }}>
      <CircularProgress />
      <Typography variant="h4" align="center">
        Verifying Email......
      </Typography>
    </Stack>
  );
}

export default Loader;
