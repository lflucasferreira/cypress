/// <reference types="cypress" />

describe('Add two women dresses on sale to the cart', () => {

	// Open the homepage
	before(() =>  cy.visit('/'))

	it('should add the women dresses from the list', () => {

		let [gender, category] = ['Women', 'Dresses']

		cy.searchItemAndOpenPage(gender, category, "Printed Summer Dress")
		cy.addItemToCart()
		cy.continueShopping()
		cy.goToDresses(gender, category)

		cy.searchItemAndOpenPage(gender, category, "Printed Chiffon Dress")
		cy.addItemToCart()

		cy.proceedToCheckout()
		cy.validateTotalPrice('$47.38')
	});
})