"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupTestServer = setupTestServer;
const buildFastify_1 = require("../../src/utils/buildFastify");
async function setupTestServer() {
    const app = await (0, buildFastify_1.createFastify)();
    await app.ready();
    return app;
}
