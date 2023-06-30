import mongoose, { ConnectOptions } from 'mongoose';

let isConnected = false;

export const connectToDatabase = async () => {
    mongoose.set('strictQuery', true);
    if (isConnected) {
        console.log('allready connected to database');
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI || '', {
            dbName: 'carshub',
            useNewUrlParser: true,
            useUnifiedTopology: true,
        } as ConnectOptions);
        isConnected = true;
        console.log('connected to database');
    } catch (error) {
        console.error(error);
    }
};