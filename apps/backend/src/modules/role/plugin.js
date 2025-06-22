export const registerRole = async (app) => {
    // Placeholder role plugin
    app.get('/test-role', async () => ({ message: 'Role plugin placeholder' }));
};
