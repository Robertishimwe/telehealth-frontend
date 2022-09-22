import React from 'react';
import { Container, Typography } from '@mui/material';
// components
import Page from '../components/dashboard/Page';

export default function DashboardApp() {
  return (
    <Page title="Dashboard">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography>
        <Typography variant="body1" sx={{ mb: 5 }}>
          Dashboard View
        </Typography>
      </Container>
    </Page>
  );
}
