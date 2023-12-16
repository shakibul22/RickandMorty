import React from 'react';
import Banner from '../Banner/Banner';
import Character from '../../Pages/Character/Character';
import LandingPage from '../../Components/LandingPage';

const Home = () => {
    return (
        <div>
            <LandingPage/>
            <Banner/>
            <Character/>
        </div>
    );
};

export default Home;