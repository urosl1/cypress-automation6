/// <reference types="Cypress" />
import { createGalery } from '../page_objects/createGallery';
const faker = require('@faker-js/faker');

describe('Create gallery test', () => {
    let galleryId;
    let galleryData = {
        title: faker.name.firstName(),
        description: faker.name.firstName(),
        image: faker.image.avatar()
    }

    before('login via backend', () => {
        cy.loginViaBackend()
        cy.visit('/create');
        cy.url().should('include', '/create');
    });

    it('create gallery', () => {
        cy.intercept({
            method: 'POST',
            url: 'https://gallery-api.vivifyideas.com/api/galleries'
        }).as('createGallery')

        createGalery.createGallery(
            galleryData.title,
            galleryData.description,
            galleryData.image
        )

        cy.wait('@createGallery').then(interception => {
            galleryId = interception.response.body.id

            expect(interception.response.body.title).eq(galleryData.title)
            cy.visit(`/galleries/${galleryId}`)
            // cy.visit('/galleries/' + galleryId)
            cy.get('h1').should('have.text', galleryData.title)
        })
    })
})