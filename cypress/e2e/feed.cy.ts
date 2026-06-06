describe('Feed y Navegación', () => {
    beforeEach(() => {
        cy.visit('/login');
        cy.get('input[type="email"]').type(Cypress.env('TEST_EMAIL') ?? 'test@prizma.com');
        cy.get('input[type="password"]').type(Cypress.env('TEST_PASSWORD') ?? 'test1234');
        cy.get('button[type="submit"]').click();
        cy.url().should('include', '/feed');
    });

    it('debería cargar el feed con juegos o estado vacío', () => {
        cy.visit('/feed');
        cy.get('body').should('be.visible');
        cy.get('body').then(($body) => {
            const hasGames = $body.find('[class*="cursor-pointer"]').length > 0;
            const hasEmpty = $body.text().includes('No hay juegos');
            expect(hasGames || hasEmpty).to.be.true;
        });
    });

    it('debería mostrar el navbar con links de navegación', () => {
        cy.visit('/feed');
        cy.get('header').should('be.visible');
        cy.contains('Feed', { matchCase: false }).should('be.visible');
    });

    it('debería navegar a detalle de juego al hacer click', () => {
        cy.visit('/feed');
        cy.get('[class*="cursor-pointer"]').first().click();
        cy.url().should('match', /\/games\/\d+/);
    });

    it('debería mostrar la página de detalle con título del juego', () => {
        cy.visit('/feed');
        cy.get('[class*="cursor-pointer"]').first().click();
        cy.url().should('match', /\/games\/\d+/);
        cy.get('h1').should('be.visible');
    });

    it('debería mostrar la sección de reseñas en el detalle', () => {
        cy.visit('/feed');
        cy.get('[class*="cursor-pointer"]').first().click();
        cy.contains(/reseñas/i).should('be.visible');
    });
});
