import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { toast, ToastContainer } from 'react-toastify';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';
import CardMedia from '@mui/material/CardMedia';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Typography from '@mui/material/Typography';
import { Paper } from '@material-ui/core';
import FeedBack from './feedBack';
import Accordion from './accordion';
import api from '../../utility/api';

function ProductPage() {
  const [accommodation, setaccommodation] = useState({
    images: [],
    Rooms: [],
    amenities: [],
  });
  const [accFeedbacks, setaccFeedback] = useState([]);
  const [feedback, sefeedback] = useState();
  const [dstatus, setdstatus] = useState(false);

  const { id } = useParams();

  const sendFeedback = async () => {
    setdstatus(true);
    const data = {
      accommodationId: id,
      feedback,
    };
    await api
      .post(`/api/accommodations/${data.accommodationId}/createFeedback`, {
        feedback: `${data.feedback}`,
      })
      .then(() => {
        setdstatus(false);
        sefeedback('');
        toast.success('Feedback sent successfully', {
          position: 'bottom-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
        });
      })
      .catch((err) => {
        if (err) {
          toast.error(`${err.response.data.error}`, {
            position: 'bottom-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
          });
        } else {
          toast.error('something went wrong, please try again later', {
            position: 'bottom-right',
            autoClose: 3000,
          });
        }
        sefeedback('');
        setdstatus(false);
      });
  };
  useEffect(() => {
    api.get(`/api/accommodations/${id}/GetAllFeedbacks`).then((res) => {
      setaccFeedback(res.data.payload);
    });
  }, [feedback]);

  useEffect(() => {
    const fetchData = async () => {
      await api
        .get(`/api/accommodations/${id}`)
        .then((res) => {
          setaccommodation(res.data.payload);
        })
        .catch((err) => {
          if (err) {
            toast.error(err.response.data.message);
            toast.error(`${err.response.data.message}`, {
              position: 'buttom-right',
              autoClose: 3000,
            });
          }
          toast.error('Something went wrong');
        });
    };
    fetchData();
  }, []);

  const image = accommodation.images[0];
  const itemData = accommodation.images;
  const { amenities, Rooms, type } = accommodation;

  return (
    <Box
      sx={{
        display: 'flex',
        opacity: [0.9, 0.8, 0.7],
      }}
    >
      <ToastContainer />
      <Container maxWidth="md" data-testid="accContainer">
        <Typography variant="h5" component="h2" data-testid="accName">
          {accommodation.name}
        </Typography>
        <CardMedia
          component="img"
          height="240"
          image={image}
          alt="green iguana"
          data-testid="accCoverImg"
        />
        <ImageList
          sx={{ width: 850, height: 170 }}
          cols={3}
          rowHeight={164}
          data-testid="accImgList"
        >
          {itemData.map((item) => (
            <ImageListItem key={item} data-testid="accimagelist">
              <img
                src={`${item}?w=164&h=124&fit=crop&auto=format`}
                srcSet={`${item}?w=164&h=124&fit=crop&auto=format&dpr=2 2x`}
                alt="img"
                loading="lazy"
              />
            </ImageListItem>
          ))}
        </ImageList>
        <Typography
          variant="h5"
          component="h2"
          data-testid="productDescriptionTitle"
        >
          Description
        </Typography>
        <Typography
          variant="body2"
          component="h2"
          data-testid="productDescription"
        >
          {accommodation.description}
        </Typography>
        <br />
        <Accordion
          amenities={amenities}
          Rooms={Rooms}
          type={type}
          data-testid="aminities"
        />
        <br />
        <Typography
          display="block"
          variant="h5"
          component="h2"
          data-testid="giveFeedback"
        >
          Give feedback
        </Typography>
        <br />

        <br />
        <FormControl fullWidth sx={{ m: 0.2 }}>
          <InputLabel
            htmlFor="outlined-adornment-amount"
            data-testid="productFeedbackTitle"
          >
            FeedBack
          </InputLabel>
          <OutlinedInput
            data-testid="productFeedbackInput"
            id="outlined-adornment-amount"
            startAdornment={<InputAdornment position="start" />}
            label="Amount"
            value={feedback}
            onChange={(e) => sefeedback(e.target.value)}
          />

          <br />
        </FormControl>
        <br />
        <Button
          data-testid="productFeedbackBtn"
          onClick={sendFeedback}
          variant="contained"
          sx={{ width: 250, display: 'none' }}
          disabled={dstatus}
        >
          Send
        </Button>
        <br />
        <Paper
          style={{ padding: '40px 20px' }}
          data-testid="accFeedbackswarper"
        >
          {accFeedbacks.map((accfeedback) => (
            <FeedBack feedbacks={accfeedback} />
          ))}
        </Paper>
      </Container>
      ;
    </Box>
  );
}

export default ProductPage;
