describe("Initializing application 2", function() {
    it("User should see their username upon logging on and redirects them to another endpoint", function() {
      cy.visit("http://localhost:5000/#/");
      const username = 'slackin';
      cy.get('input').first().click().type(username).should('have.value', username);
      cy.get('input').last().click().type(username).should('have.value', username);
      cy.get('button').first().click();
      cy.url().should('include', '/container')
      cy.get('.user-tool-bar-username').first().contains(username);
    });
  });
  
  // PASSES