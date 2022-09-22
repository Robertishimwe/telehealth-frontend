import React from 'react';
// material
import { Container, Stack, Typography } from '@mui/material';
// components
import Page from '../components/dashboard/Page';
import Table from '../components/request/Table';

export default function Blog() {
  return (
    <Page title="Dashboard: Blog">
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Trip Request
          </Typography>
          <Table />
        </Stack>
      </Container>
    </Page>
  );
}
