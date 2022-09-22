import React from 'react';
// material
import { Container, Typography } from '@mui/material';
// components
import Page from '../components/dashboard/Page';
import Accomodation from '../components/accommodation/accomodation';

export default function Accommodations() {
  return (
    <Page title="Dashboard: Products">
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Accommodations
        </Typography>
        <Accomodation />
      </Container>
    </Page>
  );
}
