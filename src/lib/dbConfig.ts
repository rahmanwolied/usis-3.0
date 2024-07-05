import mongoose from 'mongoose';

type ConnectionObject = {
	isConnected: number;
};
const connectionState: ConnectionObject = {
	isConnected: 0,
};

export async function connect(): Promise<void> {
	if (connectionState.isConnected) {
		return;
	}
	try {
		console.log(process.env.MONGODB_URI);
		const db = await mongoose.connect(process.env.MONGODB_URI! || '', {});
		connectionState.isConnected = db.connections[0].readyState;

		const connection = mongoose.connection;
		connection.on('connected', () => {
			console.log('MongoBD connected');
		});
		connection.on('error', (error) => {
			console.log('MongoDB connection error');
			console.log(error);
			process.exit();
		});
	} catch (error) {
		console.log('Something went wrong while connecting to the database');
		console.log(error);
	}
}

// import mongoose from "mongoose";
// require("dotenv").config();

// type ConnectionObject = {
//   isConnected?: number;
// };

// const connection: ConnectionObject = {};
// const { MONGODB_URI, MONGODB_DB } = process.env;

// async function connect(): Promise<void> {
//   if (connection.isConnected) {
//     console.log("Using existing connection");
//     return;
//   }

//   try {
//     const db = await mongoose.connect(MONGODB_URI!, {
//       dbName: MONGODB_DB,
//       bufferCommands: false,
//     });

//     connection.isConnected = db.connections[0].readyState;

//     console.log("New connection created");
//   } catch (error) {
//     console.log("Error connecting to database", error);
//     process.exit(1);
//   }
// }

// export default connect;
