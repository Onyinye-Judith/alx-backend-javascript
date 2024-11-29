const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
... (previous endpoints)

GET /available_payments
app.get('/available_payments', (req, res) => {
	const paymentMethods = {
		credit_cards: true,
		paypal: false

	};
	res.json({ payment_methods: paymentMethods });
});
POST /login
app.post('/login', (req, res) => {
	const { userName } = req.body;
	res.send(`Welcome ${userName}`);
});
module.exports = app;
