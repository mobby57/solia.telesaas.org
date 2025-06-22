export const registerApiKey = async (app) => {
    // Placeholder apiKey plugin
    app.get('/test-apikey', async () => ({ message: 'ApiKey plugin placeholder' }));
};
