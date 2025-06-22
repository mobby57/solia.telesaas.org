"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectInMemoryMongo = connectInMemoryMongo;
exports.disconnectInMemoryMongo = disconnectInMemoryMongo;
const mongoose_1 = __importDefault(require("mongoose"));
const mongodb_memory_server_1 = require("mongodb-memory-server");
let mongoServer;
async function connectInMemoryMongo() {
    mongoServer = await mongodb_memory_server_1.MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose_1.default.connect(uri);
    console.log('Connected to in-memory MongoDB');
}
async function disconnectInMemoryMongo() {
    await mongoose_1.default.connection.dropDatabase();
    await mongoose_1.default.connection.close();
    if (mongoServer) {
        await mongoServer.stop();
    }
    console.log('Disconnected from in-memory MongoDB');
}
