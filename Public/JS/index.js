const currentGuests = document.querySelector('#currentGuests');
const form = document.querySelector('form');
const guestControl = document.querySelector('#number');

form.addEventListener('submit', async (e) => {
	e.preventDefault();
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
		guestControl.value = 0;
	} catch (err) {
		console.error(err);
	}
});