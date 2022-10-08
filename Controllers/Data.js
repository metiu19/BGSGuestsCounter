const fs = require('fs');
const FileName = 'storage.json';

let Data = JSON.parse(fs.readFileSync(FileName).toString());

const getCurrentGuests = () => {
	const date = new Date();
	// console.log(Data, `${date.getDate()}-${date.getMonth()}`, date.getHours());
	// console.dir(Data[`${date.getDate()}-${date.getMonth()+1}`][date.getHours()]);
	const ret = Data[`${date.getDate()}-${date.getMonth()}`][date.getHours()];
	return ret != undefined ? ret : 0;
};

const updateCurrentGuests = async (guests) => {
	guests = parseInt(guests);
	const date = new Date();
	Data[`${date.getDate()}-${date.getMonth()}`][date.getHours()] = parseInt(getCurrentGuests()) + guests;
	fs.writeFileSync(FileName, JSON.stringify(Data));
};

const getDayGuests = () => {
	const date = new Date();
	// console.log(Data, `${date.getDate()}-${date.getMonth()}`, date.getHours());
	// console.dir(Data[`${date.getDate()}-${date.getMonth()+1}`][date.getHours()]);
	return Data[`${date.getDate()}-${date.getMonth()}`];
};

module.exports = {
	getCurrentGuests,
	updateCurrentGuests,
	getDayGuests,
};