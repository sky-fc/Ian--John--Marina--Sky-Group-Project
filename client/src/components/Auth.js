import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthComponent = () => {
    const navigate = useNavigate();

    const [registrationData, setRegistrationData] = useState({
        first_name: '',
        last_name: '',
        alias: '',
        email: '',
        password: '',
    });

    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
    });

    const [user, setUser] = useState(null);  // Define the user state

    const [registrationError, setRegistrationError] = useState(null);
    const [loginError, setLoginError] = useState(null);

    const handleRegistrationInputChange = (e) => {
        setRegistrationData({ ...registrationData, [e.target.name]: e.target.value });
        setRegistrationError(null); // Clear previous error when input changes
    };
    
    const handleLoginInputChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
        setLoginError(null); // Clear previous error when input changes
    };
    
    const handleRegister = async () => {
        console.log("Registration Data:", registrationData);

        // Validation
        if (registrationData.first_name.length < 2) {
            setRegistrationError('First name must be at least 2 characters.');
            return;
        }

        if (registrationData.last_name.length < 2) {
            setRegistrationError('Last name must be at least 2 characters.');
            return;
        }

        if (!registrationData.email) {
            setRegistrationError('Email is required.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/users/register', registrationData);
            console.log(response.data);

            const { token, user: userInfo } = response.data;

            // Store the token in local storage
            localStorage.setItem('authToken', token);

            // Update the state to store the user information
            setUser(userInfo);

            // Navigate to the home page
            navigate('/home');
        } catch (error) {
            console.error('Error registering user:', error);
        }
    };

    const handleLogin = async () => {
        console.log("Login Data:", loginData);

        // Validation
        if (!loginData.email) {
            setLoginError('Email is required.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/users/login', loginData);
            console.log(response.data);
            const { token, user: userInfo } = response.data;
    
            // Store the token in local storage
            localStorage.setItem('authToken', token);
    
            // Set the user state
            setUser(userInfo);
    
            navigate('/home');
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    return (
        <div className="container">
            <div className='text-center border-bottom border-solid border-dark mb-5'>
                <h1>Bright Ideas</h1>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <h2>User Registration</h2>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">
                                First Name:
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="first_name"
                                name="first_name"
                                onChange={handleRegistrationInputChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">
                                Last Name:
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="last_name"
                                name="last_name"
                                onChange={handleRegistrationInputChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="alias" className="form-label">
                                Alias:
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="alias"
                                name="alias"
                                onChange={handleRegistrationInputChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">
                                Email:
                            </label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                onChange={handleRegistrationInputChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">
                                Password:
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                name="password"
                                onChange={handleRegistrationInputChange}
                            />
                        </div>
                        {registrationError && <p className="text-danger">{registrationError}</p>}
                        <button type="button" className="btn btn-primary" onClick={handleRegister}>
                            Register
                        </button>
                    </form>
                </div>
                <div className="col-md-6">
                    <h2>User Login</h2>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">
                                Email:
                            </label>
                            <input
                                type="email"
                                className="form-control"
                                id="loginEmail"
                                name="email"
                                onChange={handleLoginInputChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">
                                Password:
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                id="loginPassword"
                                name="password"
                                onChange={handleLoginInputChange}
                            />
                        </div>
                        {loginError && <p className="text-danger">{loginError}</p>}
                        <button type="button" className="btn btn-success" onClick={handleLogin}>
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AuthComponent;

