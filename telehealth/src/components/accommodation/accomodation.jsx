import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import Stack from '@mui/material/Stack';
import AccCard from './accoCard';
import api from '../../utility/api';

function Accomodation() {
  const [accomodations, setAccomodations] = React.useState([]);
  useEffect(() => {
    api
      .get(`/api/accommodations`)
      .then((res) => {
        setAccomodations(res.data.payload);
      })
      .catch((err) => {
        if (err) {
          toast.error(err.response.data.message);
        }
        toast.error('Something went wrong');
      });
  }, []);

  return (
    <Stack
      data-testid="AccommodationscardContainer"
      spacing={0.5}
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        marginBottom: '20px',
      }}
    >
      {accomodations.map((accomodation) => (
        <AccCard
          accId={accomodation.id}
          key={accomodation.id}
          accomodationName={accomodation.name}
          address={accomodation.address}
          description={accomodation.description}
          image={accomodation.images[0]}
          margin="20px"
        />
      ))}
    </Stack>
  );
}

export default Accomodation;
