import { createFastify } from '../../src/utils/buildFastify';
export async function setupTestServer() {
    const app = await createFastify();
    await app.ready();
    return app;
}
