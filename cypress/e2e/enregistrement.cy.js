describe("Test du formulaire d'enregistrement", () => {
    it("remplit le formulaire, intercepte l'alerte et vérifie la redirection", () => {
      cy.visit("http://localhost:5173/enregistrer");
  
      cy.contains("Créer un compte").should("exist");
  
      const uniqueEmail = `test${Date.now()}@cy.com`;
  
      // Intercepter le alert() avant le clic
      cy.window().then((win) => {
        cy.stub(win, "alert").as("windowAlert");
      });
  
      cy.get('input[placeholder="Nom et prénom"]').type("Test Cypress");
      cy.get('input[placeholder="Email"]').type(uniqueEmail);
      cy.get('input[placeholder="Mot de passe"]').type("123456789");
  
      cy.get('button[type="submit"]').click();
  
      // Vérifie que l'alerte a bien été appelée
      cy.get("@windowAlert").should(
        "have.been.calledWith",
        "Enregistrement réussi ! Veuillez vérifier votre email."
      );
  
      // Attendre que la redirection se fasse (navigate)
      cy.location("pathname", { timeout: 6000 }).should("eq", "/verify-email");
    });
  });
  