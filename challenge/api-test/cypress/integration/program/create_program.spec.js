/// <reference types='cypress' />

describe('Create a Program for v1 endpoint', () => {
	beforeEach(() => {
    cy.fixture('program.json').as('program')
  })

	it('Create a program', () => {
		cy.get('@program').then((program) => {
			cy.createProgram(program)
		})
	})
})