import React from 'react';
import colors from '../../styles/colorVariables';

function UnverifiedMessage() {
  return (
    <div data-testid="unv">
      <Typography
        variant="h1"
        component="div"
        gutterBottom
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          color: colors.primaryColor,
        }}
      >
        Please verify your account to continue.
      </Typography>
    </div>
  );
}

export default UnverifiedMessage;
