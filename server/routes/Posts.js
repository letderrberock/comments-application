const express = require('express');
const router = express.Router();
const { Posts } = require('../models');

router.get('/', async (req, res) => {
	const listOfPosts = await Posts.findAll();
	return res.json(listOfPosts);
});

router.get('/ById/:id', async (req, res) => {
	const post = await Posts.findByPk(req.params.id);
	return res.json(post);
});

router.post('/', async (req, res) => {
	const post = req.body;
	await Posts.create(post);
	return res.json(post);
});

module.exports = router;
