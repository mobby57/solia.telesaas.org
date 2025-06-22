export const registerMission = async (app) => {
    // Placeholder mission plugin
    app.get('/test-mission', async () => ({ message: 'Mission plugin placeholder' }));
};
