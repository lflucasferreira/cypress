// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

Cypress.Commands.add("searchItemAndOpenPage", (gender, category, itemName) => {
	cy.goToDresses(gender, category)
	cy.get('.product-container > .right-block')
		.filter(`:contains(${itemName})`)
		.find('.price-percent-reduction')
		.parent().parent().click()
});

Cypress.Commands.add("addItemToCart", () => {
	cy.get('.exclusive > span').contains('Add to cart').click()
});

Cypress.Commands.add("continueShopping", () => {
	cy.get('.continue > span').contains('Continue shopping').click()
});

Cypress.Commands.add("proceedToCheckout", () => {
	cy.get('.button-medium > span').contains('Proceed to checkout').click()
});

Cypress.Commands.add("goToDresses", (gender, category) => {
	cy.get('.sf-menu').contains(gender).click()
	cy.get('.tree').contains(category).click()
});

Cypress.Commands.add("validateTotalPrice", (amount) => {
	cy.get('#total_price').should('have.text', amount)
});
