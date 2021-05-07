/// <reference types='cypress' />

describe('Create a Brand for v1 endpoint', () => {
	before(() => {
		cy.fixture('brand.json').as('brand')
	})

	it('Create a brand', function () {
		cy.get('@brand').then((brand) => {
			cy.createBrand(brand)
		})
	})
})