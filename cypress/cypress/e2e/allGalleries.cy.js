/// <reference types="Cypress">
import { loginPage } from "../page_objects/loginPage";
import { allGalleries } from "../page_objects/allGalleries";

describe('allGalleriesTest', () => {

    let filterInput = "Infrastructure";

    before('visit login page', () => {
        cy.visit('https://gallery-app.vivifyideas.com/');
    })

    it.only('visit home screen', () => {
        cy.intercept({
            method: 'GET',
            url: 'https://gallery-api.vivifyideas.com/api/galleries?page=1&term='
        }).as('all')
        

        cy.wait('@all').then(interception => {

            expect(interception.response.statusCode).eq(200)
        })
    })
    
})
