import React, { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import AlertMessage from '../layouts/AlertMessage';

function LoginFrom(props) {
    const [loginForm, setLoginForm] = useState({
        username: '',
        password: '',
    });
    const { loginUser } = useContext(AuthContext);
    const { username, password } = loginForm;

    const [alert, setAlert] = useState(null);
    const onChangeLoginForm = (e) =>
        setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
    const login = async (e) => {
        e.preventDefault();
        try {
            const loginData = await loginUser(loginForm);
            if (!loginData.success) {
                setAlert({ type: 'danger', message: loginData.message });
                setTimeout(() => setAlert(null), 5000);
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <>
            <Form onSubmit={login}>
                <AlertMessage info={alert} />
                <Form.Group>
                    <Form.Control
                        type='text'
                        placeholder='Username'
                        name='username'
                        required
                        className='mb-3'
                        value={username}
                        onChange={onChangeLoginForm}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Control
                        type='password'
                        placeholder='Password'
                        name='password'
                        className='mb-3'
                        required
                        value={password}
                        onChange={onChangeLoginForm}
                    />
                </Form.Group>
                <Button variant='success' type='submit'>
                    Login
                </Button>
            </Form>
            <p>
                Don't have an account ?
                <Link to='/register'>
                    <Button variant='info' size='sm' className='ml-2'>
                        Register
                    </Button>
                </Link>
            </p>
        </>
    );
}

export default LoginFrom;
