const express = require('express');
const helmet = require('helmet');
const app = express();
const Port = 3000;
const path = require('path');
const API = require('./Routes/API');
const UI = require('./Routes/UI');

app.set('view engine', 'ejs');
app.use(helmet());
app.use(express.static(path.join(__dirname + '/Public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
	console.log(req.method, req.url, req.body);
	next();
});

const Server = app.listen(Port, () => {
	console.log('Web server listening on port: ', Port);
});

app.use('/API', API);
app.use('/', UI);

app.use((req, res) => {
	res.status(404).json({err: 'Page not found!'});
});

async function StopServer(IntType) {
	console.log(`Recived: ${IntType}\nStopping webserver!`);
	Server.closeAllConnections();
	await Server.close();
	process.exit(0);
}

process.on('SIGINT', StopServer);
process.on('SIGTERM', StopServer);
process.on('SIGQUIT', StopServer);
