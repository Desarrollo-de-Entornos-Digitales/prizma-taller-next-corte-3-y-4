describe('Auth Flow', () => {
    beforeEach(() => {
        cy.clearLocalStorage();
    });

    it('debería mostrar la página de login', () => {
        cy.visit('/login');
        cy.contains('Prizma', { matchCase: false }).should('be.visible');
        cy.get('input[type="email"]').should('be.visible');
        cy.get('input[type="password"]').should('be.visible');
    });

    it('debería mostrar error con credenciales incorrectas', () => {
        cy.visit('/login');
        cy.get('input[type="email"]').type('wrong@email.com');
        cy.get('input[type="password"]').type('wrongpassword');
        cy.get('button[type="submit"]').click();
        cy.contains(/incorrectos|error|inválid/i).should('be.visible');
    });

    it('debería redirigir al feed tras login exitoso', () => {
        cy.visit('/login');
        cy.get('input[type="email"]').type(Cypress.env('TEST_EMAIL') ?? 'test@prizma.com');
        cy.get('input[type="password"]').type(Cypress.env('TEST_PASSWORD') ?? 'test1234');
        cy.get('button[type="submit"]').click();
        cy.url().should('include', '/feed');
    });

    it('debería mostrar la página de registro', () => {
        cy.visit('/register');
        cy.get('input[type="email"]').should('be.visible');
        cy.get('input[type="password"]').should('be.visible');
    });

    it('debería cerrar sesión correctamente', () => {
        cy.visit('/login');
        cy.get('input[type="email"]').type(Cypress.env('TEST_EMAIL') ?? 'test@prizma.com');
        cy.get('input[type="password"]').type(Cypress.env('TEST_PASSWORD') ?? 'test1234');
        cy.get('button[type="submit"]').click();
        cy.url().should('include', '/feed');

        cy.get('header').find('button').last().click();
        cy.contains(/cerrar sesión/i).click();
        cy.url().should('include', '/login');
    });
});
