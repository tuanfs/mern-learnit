import { Outlet, Navigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import React, { useContext } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import NavBarMenu from '../layouts/NavBarMenu';

function ProtectedRoute(props) {
    const {
        authState: { authLoading, isAuthenticated },
    } = useContext(AuthContext);
    if (authLoading) {
        return (
            <div className='spiner-container'>
                <Spinner animation='border' variant='info' />
            </div>
        );
    }
    return (
        <>
            {isAuthenticated ? (
                <>
                    <NavBarMenu /> <Outlet />
                </>
            ) : (
                <Navigate to='/login' />
            )}
        </>
    );
}

export default ProtectedRoute;
