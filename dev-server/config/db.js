import mongoose from 'mongoose'

export async function connectToDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');
      } catch (error) {
        console.error('Could not connect to database', error);
        throw error;
      }
}