import '../styles/verify.scss';
import React from 'react';
import NavBar from '../components/nav';

function Unverified() {
  return (
    <>
      <NavBar />
      <div className="verifyRequest">Please verify your Email to continue.</div>
    </>
  );
}

export default Unverified;
