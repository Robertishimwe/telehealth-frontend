/* eslint-disable react/prop-types */
import React from 'react';
import { Divider, Avatar, Grid } from '@material-ui/core';

function FeedBack(props) {
  const { feedbacks } = props;
  const imgLink = 'LLLLLLLL';
  return (
    <>
      <Grid container wrap="nowrap" spacing={2} data-testid="feedbackContainer">
        <Grid item>
          <Avatar alt="Remy Sharp" src={imgLink} data-testid="feedbackAvator" />
        </Grid>
        <Grid justifyContent="left" item xs zeroMinWidth>
          <h4
            style={{ margin: 0, textAlign: 'left' }}
            data-testid="feedbackName"
          >
            {feedbacks.User.firstName}
          </h4>
          <p style={{ textAlign: 'left' }} data-testid="feedbackContaint">
            {feedbacks.feedback}
          </p>
        </Grid>
      </Grid>
      <Divider
        variant="fullWidth"
        style={{ margin: '30px 0' }}
        data-testid="feedbackDivider"
      />
    </>
  );
}

export default FeedBack;
