describe("Initializing application 4", function() {
    it("User should be able to go to a channel and subchannel", function() {
      cy.visit("http://localhost:5000/#/");
      const username = 'slackin';
      cy.get('input').first().click().type(username).should('have.value', username);
      cy.get('input').last().click().type(username).should('have.value', username);
      cy.get('button').first().click();
      cy.url().should('include', '/container')
      cy.get('.user-tool-bar-username').first().contains(username);
      cy.get('.each-channel').first().click();
      cy.get('.sub-channel-constructor').should('exist')
      cy.get('.each-sub-channel').first().click({ force: true });
    });
  });
  
  // PASSES