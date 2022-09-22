import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import api from '../../utility/api';
import '../../styles/Table.scss';

function Table() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const renderState = async () => {
      api.get('/api/trip/request/list').then((res) => {
        setData(res.data.trips);
      });
    };
    renderState();
  }, []);

  const columns = [
    { field: 'id', headerName: 'ID', width: 90, color: 'blue' },
    {
      field: 'Accommodation',
      headerName: 'Accommodation',
      width: 180,
      cellClassName: 'accomodation-column',
      valueFormatter: (params) => params.value.name,
    },
    {
      field: 'Destination',
      headerName: 'Destination',
      width: 150,
      valueFormatter: (params) => params.value.city,
    },
    { field: 'departureDate', headerName: 'Departure Date', width: 110 },
    { field: 'returnDate', headerName: 'Return Date', width: 110 },
    { field: 'travel_reason', headerName: 'Travel Reason', width: 110 },
    { field: 'tripType', headerName: 'Trip Type', width: 110 },
    {
      field: 'manager',
      headerName: 'Manager',
      width: 180,
      valueFormatter: (params) => params.value.email,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 120,
      border: '1 solid black',
    },
  ];

  return (
    <>
      <div
        className="container"
        data-testid="request-table"
        style={{
          height: 475,
          width: '98%',
          backgroundColor: 'white',
          margin: ' 4rem 0 0 2rem',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <DataGrid
          data-testid="request-table"
          rows={data}
          columns={columns}
          pageSize={7}
          rowsPerPageOptions={[5]}
          checkboxSelection
          sx={{
            height: '100%',
            width: '100%',
            '& .MuiDataGrid-columnHeaderTitle': {
              color: '#f5f5f5',
            },
            '& .MuiDataGrid-columnHeadersInner': {
              backgroundColor: '#1565c0',
              fontWeight: 'bold',
              textAlign: 'center',
            },
            '& .MuiDataGrid-columnHeaderTitleContainerContent': {
              paddingLeft: '10px',
            },
            '& .MuiToolbar-root': {
              color: '#1565c0',
            },
            '& .MuiDataGrid-selectedRowCount': {
              color: '#1565c0',
            },
            '& .css-d3ri6l-MuiStack-root': {
              display: 'grid',
              flexDirection: 'column !important',
              alignItems: 'start',
            },
          }}
        />
      </div>
    </>
  );
}

export default Table;
