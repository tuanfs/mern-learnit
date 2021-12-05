import React, { useContext } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import learnItLogo from '../../assets/logo.svg';
import logoutIcon from '../../assets/logout.svg';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
function NavBarMenu(props) {
    const {
        authState: {
            user: { username },
        },
        logoutUser,
    } = useContext(AuthContext);
    const handleLogout = () => {
        logoutUser();
    };
    return (
        <Navbar expand='lg' bg='primary' variant='dark' className='shadow px-4'>
            <Navbar.Brand className='font-weight-bolder text-white'>
                <img
                    src={learnItLogo}
                    alt='Learn it logo'
                    width='32'
                    height='32'
                    className='mr-2'
                />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse id='basic-navbar-nav'>
                <Nav className='me-auto'>
                    <Nav.Link
                        className='font-weight-bolder text-white'
                        to='/dashboard'
                        as={Link}
                    >
                        Dashboard
                    </Nav.Link>
                    <Nav.Link
                        className='font-weight-bolder text-white'
                        to='/about'
                        as={Link}
                    >
                        About
                    </Nav.Link>
                </Nav>
                <Nav>
                    <Nav.Link
                        className='font-weight-bolder text-white'
                        disabled
                    >
                        Wellcome {username}
                    </Nav.Link>
                    <Button
                        variant='secondary'
                        className='font-weight-bolder text-white'
                        onClick={handleLogout}
                    >
                        <img
                            src={logoutIcon}
                            alt='Logout Icon'
                            width='32'
                            height='32'
                            className='mr-2'
                        />
                        Logout
                    </Button>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default NavBarMenu;
