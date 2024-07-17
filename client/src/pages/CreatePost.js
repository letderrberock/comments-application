import React from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const CreatePost = () => {
	const navigate = useNavigate();
	const PostSchema = Yup.object().shape({
		title: Yup.string().required('Required'),
		postText: Yup.string().required('Required'),
		username: Yup.string().min(4).max(15).required('Required'),
	});

	const initialValues = {
		title: '',
		postText: '',
		username: '',
	};

	const onSubmitPost = async (data) => {
		await axios.post('http://localhost:3001/posts', data);
		// fetchAllPosts();
		navigate('/');
	};

	return (
		<div className='createPostPage'>
			<h1>Create A Post</h1>
			<Formik
				initialValues={initialValues}
				onSubmit={onSubmitPost}
				validationSchema={PostSchema}
			>
				<Form className='formContainer'>
					<label htmlFor='title'>Title: </label>
					<Field
						id='title'
						name='title'
						placeholder='(e.g Beautiful city in Bulgaria..)'
					/>
					<ErrorMessage name='title' component='span' />
					<label htmlFor='postText'>Post Text: </label>
					<Field id='postText' name='postText' placeholder='Text of the desired Post' />
					<ErrorMessage name='postText' component='span' />
					<label htmlFor='username'>Username: </label>
					<Field id='username' name='username' placeholder='(e.g letderrberock)' />
					<ErrorMessage name='username' component='span' />
					<button type='submit'>Submit A Post</button>
				</Form>
			</Formik>
		</div>
	);
};

export default CreatePost;
