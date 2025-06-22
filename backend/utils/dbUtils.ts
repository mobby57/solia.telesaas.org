import mongoose from 'mongoose';

export async function connectDB() {
  const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/solia';
  await mongoose.connect(mongoUri);
  console.log('Connected to MongoDB');
}

export async function resetDB() {
  const collections = Object.keys(mongoose.connection.collections);
  for (const collectionName of collections) {
    const collection = mongoose.connection.collections[collectionName];
    try {
      await collection.deleteMany({});
    } catch (err) {
      console.error(`Failed to clear collection ${collectionName}:`, err);
    }
  }
  console.log('Database reset completed');
}
