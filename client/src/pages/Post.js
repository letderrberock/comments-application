import React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Post = () => {
	let { id } = useParams();
	const [fetchedPost, setFetchedPost] = useState({});

	useEffect(() => {
		axios.get(`http://localhost:3001/posts/ById/${id}`).then((response) => {
			setFetchedPost(response.data);
		});
	}, []);

	return (
		<div className='postPage'>
			<div className='leftSide'>
				<div className='post' id='individual'>
					<div className='title'> {fetchedPost.title} </div>
					<div className='body'>{fetchedPost.postText}</div>
					<div className='footer'>{fetchedPost.username}</div>
				</div>
			</div>
			<div className='rightSide'>Comment Section</div>
		</div>
	);
};

export default Post;
