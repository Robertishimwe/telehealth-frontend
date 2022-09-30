import React from 'react';
import {
  Audio,
  BallTriangle,
  Bars,
  Blocks,
  Circles,
  CirclesWithBar,
  ColorRing,
  Comment,
  Discuss,
  Dna,
  Grid as Gridi,
  FallingLines,
  FidgetSpinner,
  Hearts,
  InfinitySpin,
  LineWave,
  MagnifyingGlass,
  MutatingDots,
  Oval,
  ProgressBar,
  Puff,
  Radio,
  RevolvingDot,
  RotatingSquare,
  RotatingLines,
  Rings,
  TailSpin,
  ThreeDots,
  ThreeCircles,
  Triangle,
  RotatingTriangles,
  Watch,
  Vortex,
} from 'react-loader-spinner';
// import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

export const Grid = () => {
  return (
    <Gridi
      height='80'
      width='80'
      color='#13C5DD'
      ariaLabel='grid-loading'
      radius='12.5'
      wrapperStyle={{}}
      wrapperClass=''
      visible={true}
    />
  );
};
