// RegisterForm.jsx
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import './LoginSignup.css';

const RegisterForm = () => {
    const navigate = useNavigate();

    const handleRegister = async (values, { resetForm }) => {
        try {
            const response = await fetch('http://127.0.0.1:5555/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values),
            });
            const data = await response.json();
            console.log(data);
            if (response.ok) {
                navigate('/home');
            } else {
                // handle error response
                console.error('Registration failed:', data);
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
        resetForm();
    };

    const initialValues = {
        username: '',
        email: '',
        password: '',
    };

    const validationSchema = Yup.object({
        username: Yup.string().required('Username Required'),
        email: Yup.string().email('Invalid email format').required('Email Required'),
        password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password Required'),
    });

    return (
        <div className="container">
            <h1>Register</h1>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleRegister}
            >
                <Form>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <Field type="text" id="username" name="username" />
                        <ErrorMessage name="username" component="div" className="error" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <Field type="email" id="email" name="email" />
                        <ErrorMessage name="email" component="div" className="error" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <Field type="password" id="password" name="password" />
                        <ErrorMessage name="password" component="div" className="error" />
                    </div>
                    <button type="submit">Register</button>
                </Form>
            </Formik>
        </div>
    );
};

export default RegisterForm;
