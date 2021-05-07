/// <reference types='cypress' />

describe('Create a Location for v1 endpoint', () => {
	before(() => {
		cy.fixture('program.json').then((program) => {
			cy.createProgram(program)
		})
		cy.fixture('brand.json').then((brand) => {
			cy.createBrand(brand)
		})
		cy.fixture('program_id.json').then(function (program) { this.program = program })
		cy.fixture('location.json').as('location')
	})

	it('Create a location', () => {
		cy.get('@location').then(function (location) {
			cy.createLocation(this.program.id, location)
		})
	})
})