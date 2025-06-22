export const registerComment = async (app) => {
    // Placeholder comment plugin
    app.get('/test-comment', async () => ({ message: 'Comment plugin placeholder' }));
};
