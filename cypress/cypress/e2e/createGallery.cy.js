/// <reference types="Cypress">
import { createGallery } from "../page_objects/createGallery";
const faker = require('@faker-js/faker');

describe('Create a Gallery', () => {

    let galleryId;
    let description = faker.lorem.words(3);
    let title = faker.lorem.words(1);
    let oneLetterTitle = faker.random.alpha();
    let maxCharTitle = faker.random.alphaNumeric(199);
    let imageURL = "https://static.remove.bg/remove-bg-web/eb1bb48845c5007c3ec8d72ce7972fc8b76733b1/assets/start_remove-c851bdf8d3127a24e2d137a55b1b427378cd17385b01aec6e59d5d4b5f39d2ec.png";
    let emailLogin = "kss2@gmail.com";
    let passLogin = "12345678";
    let emptyImageUrl = " ";
    let emptyDescription = " ";
    let emptyTitle = " ";
    let galleryData = {
        title: faker.name.firstName(),
        description: faker.name.firstName(),
        image: faker.image.avatar()
    }

    beforeEach('Gallery creation', () => {

        cy.visit('https://gallery-app.vivifyideas.com/login');
        cy.get('#email').type(emailLogin);
        cy.get('#password').type(passLogin);
        cy.get('.btn.btn-custom').click();
        cy.wait(3000);
        cy.visit('https://gallery-app.vivifyideas.com/create');

    })

    // before('login via backend', () => {
    //     cy.loginViaBackend()
    //     cy.visit('/create');
    //     cy.url().should('include', '/create');
    // });

    it.only('create gallery', () => {
        cy.intercept({
            method: 'POST',
            url: 'https://gallery-api.vivifyideas.com/api/galleries'
        }).as('createGallery')

        createGallery.createGall(
            galleryData.title,
            galleryData.description,
            galleryData.image
        )

        cy.wait('@createGallery').then(interception => {
            galleryId = interception.response.body.id
            expect(interception.response.statusCode).eq(201)
            expect(interception.response.body.title).eq(galleryData.title)
            cy.visit(`/galleries/${galleryId}`)
            // cy.visit('/galleries/' + galleryId)
            cy.get('h1').should('have.text', galleryData.title)
        })
    })

    it('Gallery creation correct parameters', () => {
        createGallery.createGall(title, description, imageURL);
        cy.url().should('not.contain', '/create');
        cy.visit('https://gallery-app.vivifyideas.com/my-galleries');
        cy.get('.box-title').should('contain', title);

    })

    it('Gallery creation no image', () => {
        createGallery.createGall(title, description, emptyImageUrl);
        cy.url().should('contain', '/create');
        cy.visit('https://gallery-app.vivifyideas.com/my-galleries');
        cy.get('.box-title').should('not.contain', title);

    })

    it('Gallery creation no description', () => {
        createGallery.createGall(title, emptyDescription, imageURL);
        cy.visit('https://gallery-app.vivifyideas.com/my-galleries');
        cy.get('.box-title').should('contain', title);

    })

    it('Gallery creation no title', () => {
        createGallery.createGall(emptyTitle, description, imageURL);
        cy.visit('https://gallery-app.vivifyideas.com/my-galleries');
        cy.get('.box-title').should('not.contain', title);

    })

    it('Gallery creation title 1 letter', () => {
        createGallery.createGall(oneLetterTitle, description, imageURL);
        cy.visit('https://gallery-app.vivifyideas.com/my-galleries');
        cy.get('.box-title').should('not.contain', title);

    })

    it('Gallery creation title 260 letter', () => {
        createGallery.createGall(maxCharTitle, description, imageURL);
        cy.visit('https://gallery-app.vivifyideas.com/my-galleries');
        cy.get('.box-title').should('not.contain', title);

    })
})
