export const registerTenant = async (app) => {
    // Placeholder tenant plugin
    app.get('/test-tenant', async () => ({ message: 'Tenant plugin placeholder' }));
};
