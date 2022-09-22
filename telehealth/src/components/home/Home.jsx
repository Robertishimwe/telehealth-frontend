import * as React from 'react';
import Button from './Button';
import Typography from './Typography';
import ProductLayout from './PageLayout';
import Theme from '../../styles/muiTheme';

const backgroundImage =
  'https://images.unsplash.com/photo-1534854638093-bada1813ca19?auto=format&fit=crop&w=1400&q=80';

export default function Home() {
  return (
    <ProductLayout
      sxBackground={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundColor: Theme.imageColor, // Average color of the background image.
        backgroundPosition: 'center',
      }}
    >
      {/* Increase the network loading priority of the background image. */}
      <img
        style={{ display: 'none' }}
        src={backgroundImage}
        alt="increase priority"
      />
      <Typography color="inherit" align="center" variant="h2" marked="center">
        Welcome to Barefoot Nomad
      </Typography>
      <Typography
        color="inherit"
        align="center"
        variant="h5"
        sx={{ mb: 4, mt: { sx: 4, sm: 10 } }}
      >
        Best Travel Service Provider
      </Typography>
      <Button
        color="secondary"
        size="large"
        variant="contained"
        component="a"
        href="/"
        sx={{ mt: 8 }}
      >
        Get started
      </Button>
      <Typography variant="body2" color="inherit" sx={{ mt: 2 }}>
        Discover the experience
      </Typography>
    </ProductLayout>
  );
}
