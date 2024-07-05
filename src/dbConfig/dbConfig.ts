import mongoose from "mongoose";

export async function connect() {
    try {
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