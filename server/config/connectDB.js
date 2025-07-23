import mongoose from 'mongoose';

const connectDB = async (DB_URL) => {
    try {
        await mongoose.connect(DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB Connected Successfully');
    } catch (error) {
        console.error('MongoDB Connection Failed:', error.message);
        process.exit(1); // Exit process with failure
    }
};

export default connectDB;
