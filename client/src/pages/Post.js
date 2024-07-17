import React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Formik, Field, Form, ErrorMessage, useFormikContext } from 'formik';
import * as Yup from 'yup';

const Post = () => {
	let { id } = useParams();
	const [fetchedPost, setFetchedPost] = useState({});
	const [fetchedComments, setFetchedComments] = useState([]);

	const fetchPostAndComments = () => {
		axios
			.get(`http://localhost:3001/posts/ById/${id}`)
			.then((response) => {
				setFetchedPost(response.data);
			})
			.catch((error) => {
				console.error('Error fetching post:', error);
			});

		axios
			.get(`http://localhost:3001/comments/${id}`)
			.then((response) => {
				setFetchedComments(response.data);
			})
			.catch((error) => {
				console.error('Error fetching comments:', error);
			});
	};

	useEffect(() => {
		fetchPostAndComments();
	}, [id]);

	const CommentSchema = Yup.object().shape({
		commentBody: Yup.string(),
	});

	const initialValues = {
		commentBody: '',
	};

	const onSubmitPost = async (data, { resetForm }) => {
		const commentToSend = {
			...data,
			postId: id,
		};
		try {
			await axios.post('http://localhost:3001/comments', commentToSend);
			fetchPostAndComments();
			resetForm();
		} catch (error) {
			console.error('Error submitting comment:', error);
		}
	};

	return (
		<div className='postPage'>
			<div className='leftSide'>
				<div className='post' id='individual'>
					<div className='title'> {fetchedPost.title} </div>
					<div className='body'>{fetchedPost.postText}</div>
					<div className='footer'>{fetchedPost.username}</div>
				</div>
			</div>
			<div className='rightSide'>
				<Formik
					initialValues={initialValues}
					onSubmit={onSubmitPost}
					validationSchema={CommentSchema}
				>
					<Form className='formContainer'>
						<label htmlFor='commentBody'>Write a comment: </label>
						<Field as='textarea' id='commentBody' name='commentBody' />
						<button type='submit'>Submit A Comment</button>
					</Form>
				</Formik>
				<div className='commentsSection'>
					{fetchedComments.map((comment) => (
						<div className='comment' key={comment.id}>
							<div className='commentBody'>
								<p>{comment.commentBody}</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Post;
