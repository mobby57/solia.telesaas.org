export const registerUser = async (app) => {
    // Placeholder user plugin
    app.get('/test-user', async () => ({ message: 'User plugin placeholder' }));
};
