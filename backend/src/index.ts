import express from 'express';
import UsisSDK from './services/usisSDK';

const app = express();
const USIS = new UsisSDK();

app.get('/', (_req, res) => {
	res.send('Hello World!!');
});

app.get('/class-schedule', async (_req, res) => {
	const classSchedule = await USIS.getClassSchedule();
	res.send(classSchedule);
});

app.listen(3000, () => {
	console.log('Server is running on http://localhost:3000');
});
