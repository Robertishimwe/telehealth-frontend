import React from 'react';
// material
import { Typography } from '@mui/material';
// components
import Role from '../components/role/table';

export default function Users() {
  return (
    <>
      <Typography variant="h4" gutterBottom>
        Users
      </Typography>
      <Role />
    </>
  );
}
