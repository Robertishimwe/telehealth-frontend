import React from 'react';
import MainTopHeader from '../components/headers/MainTopHeader';
import NotFoundImg from '../asset/notFound.png'


function NotFound() {
	return (
		<>
			<MainTopHeader />
            <div style={{display:'flex', justifyContent:'center', alignItem:'center'}}>
            <img src={NotFoundImg} alt="page not found" style={{width:'100', margin:'auto'}}/>
            </div>

		</>
	);
}

export default NotFound;
