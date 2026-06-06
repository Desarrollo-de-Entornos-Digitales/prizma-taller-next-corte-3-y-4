import './commands';

Cypress.on('uncaught:exception', (err) => {
    if (err.message.includes('Hydration')) return false;
    if (err.message.includes('hydration')) return false;
    return true;
});
