const express = require('express');
const router = express.Router();
const { Comments } = require('../models');

router.get('/:postId', async (req, res) => {
	const { postId } = req.params;
	const comments = await Comments.findAll({
		where: {
			postId: postId,
		},
	});
	return res.json(comments);
});

router.post('/', async (req, res) => {
	const comment = req.body;
	await Comments.create(comment);
	return res.json(comment);
});

module.exports = router;
