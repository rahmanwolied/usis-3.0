import mongoose from 'mongoose';

type ConnectionObject = {
	isConnected: number;
};
const connection: ConnectionObject = {
	isConnected: 0,
};

async function dbConnect(): Promise<void> {
	if (connection.isConnected) {
		return;
	}

	try {
		const db = await mongoose.connect(process.env.MONGODB_URI || '', {});
		connection.isConnected = db.connections[0].readyState;
		console.log('Connected to MongoDB');
	} catch (error) {
		console.log('Error connecting to MongoDB', error);
		process.exit(1);
	}
}

export default dbConnect;
