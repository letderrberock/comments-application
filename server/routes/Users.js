const express = require('express');
const router = express.Router();
const { Users } = require('../models');
const bcrypt = require('bcrypt');

router.post('/register', async (req, res) => {
	const { username, password } = req.body;
	const hashedPassword = await bcrypt.hash(password, 10);
	const createdUser = await Users.create({
		username: username,
		password: hashedPassword,
	});
	return res.json(createdUser);
});

router.post('/login', async (req, res) => {
	const { username, password } = req.body;
	const user = await Users.findOne({ where: { username: username } });
	if (!user) return res.json({ error: 'User not found' });

	// Load hash from your password DB.
	const passwordsMatch = await bcrypt.compare(password, user.password);
	if (!passwordsMatch) res.json({ error: 'The username and password do not match' });
	return res.json('You are logged in!');
});

module.exports = router;
