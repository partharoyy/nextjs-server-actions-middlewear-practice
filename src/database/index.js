import mongoose from 'mongoose';
import 'dotenv/config';

async function connectDB() {
  try {
    await mongoose.connect(process.env.NEXT_PUBLIC_DATABASE_URI);
    console.log('Connected to DB');
  } catch (error) {
    console.log(error);
  }
}

export default connectDB;
