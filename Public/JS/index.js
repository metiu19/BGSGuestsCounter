const currentGuests = document.querySelector('#currentGuests');
const form = document.querySelector('form');
const guestControl = document.querySelector('#number');
const feedback = document.querySelector('#feedback');

form.addEventListener('submit', async (e) => {
	e.preventDefault();
	feedback.textContent = 'Loading...';

	const guests = guestControl.value;

	try {
		const res = await fetch('/API/guests', {
			method: 'POST',
			body: JSON.stringify({ guests }),
			headers: {'Content-Type': 'application/json'},
		});
		const data = await res.json();

		if (data.err) return console.error(data.err);
		currentGuests.textContent = data.data;
		guestControl.value = '';

		feedback.textContent = '';
	} catch (err) {
		console.error(err);
	}
});