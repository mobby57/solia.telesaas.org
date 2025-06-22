export async function createFastify() {
    // Dynamically import buildApp to ensure correct ESM resolution with .js extension
    const mod = await import('../../src/app.js');
    const buildApp = mod.buildApp;
    if (typeof buildApp !== 'function') {
        throw new Error('buildApp is not a function. Please check the import in buildFastify.ts');
    }
    const app = await buildApp();
    await app.ready();
    // Add close method to app for tests that call app.close()
    if (!app.close) {
        app.close = ((callback) => {
            if (callback) {
                callback();
                return undefined;
            }
            return Promise.resolve(undefined);
        });
    }
    return app;
}
