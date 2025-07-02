import mongoose from 'mongoose';




const connectDB = async (DB_URL) => {

    try {
        await mongoose.connect(DB_URL);
        console.log('DB Connected');
    } catch (error) {
        console.error('Could not connect to the Database!');
        console.error(error.message);
    }
}

export default connectDB;