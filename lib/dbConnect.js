
import mongoose from 'mongoose';

const dbConnect = async () => {
  try {
    if (mongoose.connection.readyState >= 1) return;

    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected!');
  } catch (error) {
    console.error('MongoDB Connection Error:', error);
    throw error;
  }
};

export default dbConnect;