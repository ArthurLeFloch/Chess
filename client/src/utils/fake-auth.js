const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const port = 8080;
const secretKey = process.env.SECRET_KEY ? process.env.SECRET_KEY : 'secret';

const app = express();
app.use(cors());
app.use(express.json());

const users = [];

function userAdd(email, password) {
	users.push({ email, password });
}

userAdd("user@user", "1234");

function userVerify(email, password) {
	return users.find(user => user.email === email && user.password === password);
}

app.post('/register', (req, res) => {
	console.log(`Received register request: ${JSON.stringify(req.body)}`);
	const { email, password } = req.body;
	if (users.find(user => user.email === email)) {
		return res.status(400).json({ message: 'User already exists' });
	}
	userAdd(email, password);
	const token = jwt.sign({ email }, secretKey, { expiresIn: 30 });
	return res.json({ token });
});

app.post('/login', (req, res) => {
	console.log(`Received login request: ${JSON.stringify(req.body)}`);
	const { email, password } = req.body;
	if (userVerify(email, password)) {
		//expires in 10 seconds
		const token = jwt.sign({ email }, secretKey, { expiresIn: 30 });
		return res.json({ token });
	}
	console.log(`Invalid credentials for ${email}`);
	res.status(401).json({ message: 'Unauthorized' });
});

app.get('/auth', (req, res) => {
	const token = req.headers.authorization.split(' ')[1];
	if (!token) {
		return res.status(401).json({ message: 'No token provided' });
	}
	jwt.verify(token, secretKey, (err, decoded) => {
		if (err) {
			console.log("Invalid token");
			return res.status(401).json({ message: 'Unauthorized' });
		}
		console.log(`Token verified: ${decoded.email}`);
		res.json({ message: 'Authenticated' });
	});
});

app.listen(port, () => console.log(`Server listening on port ${port}`));