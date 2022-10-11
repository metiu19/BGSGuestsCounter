const { Router } = require('express');
const router = Router();
const { getCurrentGuests, updateCurrentGuests, getDayGuests } = require('../Controllers/Data');

router.get('/guests', (req, res) => {
	try {
		res.status(200).json({res: getCurrentGuests()});
	} catch (err) {
		console.error(err);
		res.status(500).json({err});
	}
});

router.post('/guests', (req, res) => {
	const guests = req.body.guests;
	try {
		updateCurrentGuests(guests);
		res.status(201).json({res: 'Guests updated to', data:getCurrentGuests()});
	} catch (err) {
		console.error(err);
		res.status(500).json({err});
	}
});

router.get('/oldGuests', (req, res) => {
	const date = new Date(req.query.date);
	try {
		const data = getDayGuests(date);
		res.status(200).json({res: data});
	} catch (err) {
		console.error(err);
		res.status(500).json({err});
	}
});

module.exports = router;