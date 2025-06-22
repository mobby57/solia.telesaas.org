export const registerAuth = async (app) => {
    // Placeholder auth plugin
    app.get('/test-auth', async () => ({ message: 'Auth plugin placeholder' }));
};
