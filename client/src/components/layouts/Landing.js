import React from 'react';
import { Navigate } from 'react-router-dom';

function Landing(props) {
    return <Navigate to='/login' />;
}

export default Landing;
