import mongoose from "mongoose";

export async function connect() {
    try {
        console.log(process.env.MONGODB_URI)
        mongoose.connect(process.env.MONGODB_URI!)
        const connection = mongoose.connection 
        connection.on('connected', () => {
            console.log('MongoBD connected');
        })
        connection.on('error', (error) => {
            console.log('MongoDB connection error');
            console.log(error);
            process.exit();
        })


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