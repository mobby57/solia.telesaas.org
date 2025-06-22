import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
let mongoServer;
export async function setupInMemoryMongo() {
    if (mongoose.connection.readyState === 1) {
        await mongoose.disconnect();
    }
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    console.log(`MongoMemoryServer URI: ${uri}`);
    await mongoose.connect(uri, {
        serverSelectionTimeoutMS: 30000,
    });
}
export async function teardownInMemoryMongo() {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    if (mongoServer) {
        await mongoServer.stop();
    }
}
