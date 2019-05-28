describe("Initializing application 3", function() {
    it("User should be able to switch their status to invisible", function() {
      cy.visit("http://localhost:5000/#/");
      const username = 'slackin';
      cy.get('input').first().click().type(username).should('have.value', username);
      cy.get('input').last().click().type(username).should('have.value', username);
      cy.get('button').first().click();
      cy.url().should('include', '/container')
      cy.get('.user-tool-bar-username').first().contains(username);
      cy.get('.user-tool-bar-image').first().click();
      cy.get('.status').should('exist').last().click()
    });
  });
  
  // PASSES