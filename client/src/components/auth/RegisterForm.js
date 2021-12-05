import React, { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import AlertMessage from '../layouts/AlertMessage';

function RegisterForm(props) {
    const [registerForm, setRegisterForm] = useState({
        username: '',
        password: '',
        confirmPassword: '',
    });
    const [alert, setAlert] = useState(null);

    const navigate = useNavigate();

    const { registerUser } = useContext(AuthContext);
    const { username, password, confirmPassword } = registerForm;

    const onChangeRegisterForm = (e) =>
        setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });

    const register = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setAlert({ type: 'danger', message: 'Password do not match' });
            setTimeout(() => setAlert(null), 5000);
            return;
        }
        try {
            const registerData = await registerUser(registerForm);
            if (!registerData.success) {
                setAlert({ type: 'danger', message: registerData.message });
                setTimeout(() => setAlert(null), 5000);
            }
            navigate('/login');
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <>
            <Form onSubmit={register}>
                <AlertMessage info={alert} />
                <Form.Group>
                    <Form.Control
                        type='text'
                        placeholder='Username'
                        name='username'
                        required
                        className='mb-3'
                        value={username}
                        onChange={onChangeRegisterForm}
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
                        onChange={onChangeRegisterForm}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Control
                        type='password'
                        placeholder='Confirm Password'
                        name='confirmPassword'
                        className='mb-3'
                        required
                        value={confirmPassword}
                        onChange={onChangeRegisterForm}
                    />
                </Form.Group>
                <Button variant='success' type='submit'>
                    Register
                </Button>
            </Form>
            <p>
                Already have an account ?
                <Link to='/login'>
                    <Button variant='info' size='sm' className='ml-2'>
                        Login
                    </Button>
                </Link>
            </p>
        </>
    );
}

export default RegisterForm;
