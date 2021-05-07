// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// -- PROGRAM COMMANDS --

Cypress.Commands.add('createProgram', (data) => {
	cy.request({
		method: 'POST',
		url: '/programs',
		headers: {
			'content-type': 'application/json',
			'fidel-key': Cypress.env('fidel_key')
		},
		body: data
	}).its('body').then((body) => {
		expect(body).to.have.property('status', 201);

		let item = body.items.find(item => item.name === data.name)
		expect(item.active).to.eql(true)
		cy.writeFile("cypress/fixtures/program_id.json", JSON.stringify({"id": item.id}))
	})
})

// -- BRAND COMMANDS --

Cypress.Commands.add('createBrand', (data) => {
	cy.request({
		method: 'POST',
		url: '/brands',
		headers: {
			'content-type': 'application/json',
			'fidel-key': Cypress.env('fidel_key')
		},
		body: data
	}).its('body').then((body) => {
		expect(body).to.have.property('status', 201);

		let item = body.items.find(item => item.name === data.name)
		expect(item.consent).to.eql(true)

		// Update location fixture with the new brand id
		if (item.id) {
			// Update location fixture file
			cy.createFakeLocationData(item.id)

			// Update brand fixture file
			cy.fixture('brand.json').then((brand) => {
				const uuid = () => Cypress._.random(0, 1e6)

				cy.request("https://picsum.photos/200")
				  .then((image) => {
					cy.writeFile("cypress/fixtures/brand.json", JSON.stringify({...brand, "name": `Brand_Test_${uuid()}`, "logoURL": image.allRequestResponses[1]["Request URL"]}))
				}).as('image')
			})
		}
	})
})

// -- LOCATION COMMANDS --

Cypress.Commands.add('createLocation', (programId, data) => {
	cy.request({
		method: 'POST',
		url: `/programs/${programId}/locations`,
		headers: {
			'content-type': 'application/json',
			'fidel-key': Cypress.env('fidel_key')
		},
		body: data
	}).its('body').then((body) => {
		expect(body).to.have.property('status', 201);

		let item = body.items.find(item => item.name === data.name)
		expect(item.active).to.eql(true)
	})
})

Cypress.Commands.add('createFakeLocationData', (id) => {
	cy.task("freshLocation").then((location) => {
		const data = {
			"address": location.address,
			"city": location.city,
			"countryCode": `GBR`,
			"postcode": location.postcode,
			"metadata": {
				"customKey1": "customValue1",
				"customKey2": "customValue2"
			},
			"searchBy": {
				"merchantIds": {
					"visa": [
						"1234567",
						"7654321"
					],
					"mastercard": [
						"1234567",
						"7654321"
					]
				}
			},
			"brandId": id
		}
		cy.writeFile("cypress/fixtures/location.json", data)
	});
})