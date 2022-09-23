import React from 'react';
import Hero from '../components/hero/Hero'
import MainTopHeader from '../components/headers/MainTopHeader';

import Screens from '../components/videoConference/Screens'


function Home() {
	return (
		<>
			<MainTopHeader />
            <Hero/>
			<Screens/>
		</>
	);
}

export default Home;
