const { Router } = require('express');
const router = Router();
const { getCurrentGuests, getDayGuests } = require('../Controllers/Data');

router.get('/', (req, res) => {
	res.status(200).render('index', {currentGuests: getCurrentGuests()});
});

router.get('/list', (req, res) => {
	res.status(200).render('list', {dayGuests: getDayGuests()});
});

module.exports = router;