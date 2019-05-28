describe("Initializing application 1", function() {
    it("User can type email and password into login inputs", function() {
      cy.visit("http://localhost:5000/#/");
      cy.get('input').first().click().type('slackin').should('have.value', 'slackin');
      cy.get('input').last().click().type('slackin').should('have.value', 'slackin');
      cy.get('button').should('exist'); // login button exists


    });
  });
  
  // PASSES