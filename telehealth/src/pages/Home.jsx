import React from 'react';
import Hero from '../components/hero/Hero'
import MainTopHeader from '../components/headers/MainTopHeader';
import Appointment from '../components/Form.jsx/Appointment';

function Home() {
	return (
		<>
			<MainTopHeader />
            <Hero/>
            <Appointment/>
		</>
	);
}

export default Home;
