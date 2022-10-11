const fs = require('fs');
const FileName = 'storage.json';

let Data = JSON.parse(fs.readFileSync(FileName).toString());
console.log(Data);

const getCurrentGuests = (date = new Date()) => {
	const ret = getDayGuests(date)[date.getHours()];
	return ret != undefined ? ret : 0;
};

const updateCurrentGuests = async (guests, date = new Date()) => {
	guests = parseInt(guests);
	Data[`${date.getDate()}-${date.getMonth()}`][date.getHours()] = parseInt(getCurrentGuests()) + guests;
	fs.writeFileSync(FileName, JSON.stringify(Data));
};

const getDayGuests = (date = new Date()) => {
	const ret = Data[`${date.getDate()}-${date.getMonth()}`];
	return ret != undefined ? ret : {};
};

module.exports = {
	getCurrentGuests,
	updateCurrentGuests,
	getDayGuests,
};