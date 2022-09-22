/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { toast } from 'react-toastify';
import { Button, CardActionArea, CardActions } from '@mui/material';
import like from '../../asset/unlike.svg';
import api from '../../utility/api';

export default function MultiActionAreaCard(props) {
  const { accomodationName, address, description, image, accId } = props;
  const [likesNumber, setlikelikesNumber] = useState('');
  const [trigger, setTrigger] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/api/accommodations/${accId}/likes`).then((res) => {
      setlikelikesNumber(res.data.likes);
    });
  }, [trigger]);

  const handleLike = () => {
    setlikelikesNumber(Number(likesNumber) + 1);
    api
      .get(`/api/accommodations/${accId}/react`)
      .then(() => {
        setTrigger(trigger + 1);
      })
      .catch((err) => {
        if (err) {
          toast.error(err.response.data.message);
        }
        toast.error('Something went wrong');
      });
  };

  const handleView = () => {
    navigate(`/dashboard/accomodation/${accId}`);
  };

  return (
    <Card sx={{ maxWidth: 255, maxHeight: 350 }} data-testid="card">
      <CardActionArea className="meeeeeee">
        <CardMedia
          component="img"
          height="140"
          image={image}
          alt="green iguana"
          data-testid="cardIMG"
        />
        <CardContent data-testid="cardCONTAINT">
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            data-testid="cardDesc"
          >
            {accomodationName}
          </Typography>
          <Typography component="div" data-testid="cardAddress">
            {address}
          </Typography>
          <Typography
            variant="body3"
            color="text.secondary"
            data-testid="cardDes"
          >
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" data-testid="like">
          <img src={like} alt="like" onClick={handleLike} />
        </Button>
        <Typography data-testid="likesNumber">{likesNumber}</Typography>

        <Button
          size="small"
          color="primary"
          align
          onClick={handleView}
          data-testid="views"
        >
          View
        </Button>
      </CardActions>
    </Card>
  );
}
