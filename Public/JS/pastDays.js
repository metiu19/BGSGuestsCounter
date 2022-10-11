const form = document.querySelector('form');
const feedback = document.querySelector('#feedback');
const dataDiv = document.querySelector('#data');

form.addEventListener('submit', async (e) => {
	e.preventDefault();
	
	feedback.textContent = 'Loading...';
	const date = form.date.value;

	try {
		const res = await fetch(`/API/oldGuests?date=${date}`, {
			method: 'GET',
			headers: {'Content-Type': 'none'}
		});
		const data = await res.json();

		if (data.err) {
			feedback.textContent = 'Error!';
			return console.error(data.err);
		}

		const pastDate = new Date(date);
		var totalGuests = 0;
		for(const hour in data.res) {
			totalGuests += data.res[hour];
		}
		dataDiv.innerHTML = `
			<h4>${pastDate.getDate()}/${pastDate.getMonth()}/${pastDate.getFullYear()}</h4>
			<p>Totali: ${totalGuests}</p>
		`;

		var guestsTable = document.createElement('table');
		guestsTable.insertRow().innerHTML = `
			<th>Fascia oraria</th>
			<th>Numero Guests</th>
		`;
		for(const hour in data.res) {
			guestsTable.insertRow().innerHTML = `
				<td>${hour}:00 - ${parseInt(hour)+1}:00</td>
				<td>${data.res[hour]}</td>
			`;
		}
		dataDiv.appendChild(guestsTable);

		feedback.textContent = '';
	} catch (err) {
		console.error(err);
	}

});