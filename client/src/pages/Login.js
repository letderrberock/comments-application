import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const Login = () => {
	const navigate = useNavigate();
	const LoginSchema = Yup.object().shape({
		username: Yup.string().min(4).max(15).required('Required'),
		password: Yup.string().min(4).max(13).required('Required'),
	});

	const initialValues = {
		username: '',
		password: '',
	};

	const onSubmitLogin = async (data) => {
		await axios.post('http://localhost:3001/auth/login', data);
		console.log('Succesfully logged', data);
		navigate('/');
	};

	return (
		<div className='createPostPage'>
			<h1>Login</h1>
			<Formik
				initialValues={initialValues}
				onSubmit={onSubmitLogin}
				validationSchema={LoginSchema}
			>
				<Form className='formContainer'>
					<label htmlFor='username'>Username </label>
					<Field id='username' name='username' placeholder='Enter your username here..' />
					<ErrorMessage name='username' component='span' />
					<label htmlFor='password'>Password: </label>
					<Field
						type='password'
						id='password'
						name='password'
						placeholder='Enter your password here..'
					/>
					<ErrorMessage name='password' component='span' />
					<button type='submit'>Login now</button>
				</Form>
			</Formik>
		</div>
	);
};

export default Login;
