// const locators = require('../fixtures/locators.json');
// const { registerPage } = require('../page_objects/registerPage');
// import { faker } from '@faker-js/faker';
import { registerPage } from "../page_objects/registerPage";
const faker = require('@faker-js/faker');

describe('registration test', () => {


    let existingEmail = "uros.letic00@gmail.com";
    let correctPassword = "12345678";
    let firstName = faker.name.firstName();
    let lastName = faker.name.lastName();
    let password = faker.internet.password();
    let email = faker.internet.email();
    let passwordWithoutNumber = faker.internet.password(20, true, /[A-Z]/);
    let oneLetterName = faker.random.alpha({ count: 1 });

    beforeEach(() => {
        cy.visit('/register');
        firstName = faker.name.firstName();
        lastName = faker.name.lastName();
        password = faker.internet.password();
        email = faker.internet.email();
        passwordWithoutNumber = faker.internet.password(20, true, /[A-Z]/);
        oneLetterName = faker.random.alpha({ count: 1 });
    })


    it.only('successful registration', () => {
        cy.intercept({
            method: 'POST',
            url: 'https://gallery-api.vivifyideas.com/api/auth/register'
        }).as('registration')

        registerPage.register(firstName, lastName, email, password, password);
        

        cy.wait('@registration').then(interception => {
            expect(interception.response.statusCode).eq(200);
            cy.url().should("not.include","/register");
        })
    })

    it('Go to gallery app registration page and verify all elements exist', () => {

        // cy.get('#first-name');
        // cy.get('#last-name');
        // cy.get('#email');
        // cy.get('#password');
        // cy.get('#password-confirmation');
        // cy.get('.form-check-input');
        // cy.get('.btn');
        registerPage.register(firstName, lastName, existingEmail, password, password);

        cy.url().should('contain', '/register');
        cy.get('.nav-link').should('have.length', 3);

    })

    it('Go to gallery app registration page and correctly submit all credentials', () => {

        // let email = Math.floor(Math.random() * 9999999);
        // email = String(email) + "@gmail.com"
        // Cypress.env()
        // console.log(Cypress.env('register_url'))
        // console.log("URLsS");
        // console.log(url);
        cy.get('#first-name').type(firstName);
        cy.get('#last-name').type(lastName);
        cy.get('#email').type(email);
        cy.get('#password').type(correctPassword);
        cy.get('#password-confirmation').type(correctPassword);
        cy.get('.form-check-input').click();
        cy.get('.btn').click();
        cy.url().should('contain', '/register');

    })

    it('Go to gallery app registration page and submit all correct credentials except the first name with one letter', () => {

        cy.get('#first-name').type(oneLetterName);
        cy.get('#last-name').type(lastName);
        cy.get('#email').type(email);
        cy.get('#password').type(password);
        cy.get('#password-confirmation').type(password);
        cy.get('.form-check-input').click();
        cy.get('.btn').click();
        cy.url().should('not.contain', '/register');

    })

    it('Go to gallery app registration page and correctly submit all credentials without checking the agree box', () => {

        // let email = Math.floor(Math.random() * 9999999);
        // email = String(email) + "@gmail.com"
        // Cypress.env()
        // console.log(Cypress.env('register_url'))
        // console.log("URLsS");
        // console.log(url);
        cy.get('#first-name').type(firstName);
        cy.get('#last-name').type(lastName);
        cy.get('#email').type(email);
        cy.get('#password').type(correctPassword);
        cy.get('#password-confirmation').type(correctPassword);
        cy.get('.btn').click();
        cy.url().should('not.contain', '/register');
        cy.get('.nav-link').should('have.length', 4)

    })

    it('Go to gallery app registration page and submit empty form', () => {

        // Checking required fields, form should show alerts at all required fields.

        cy.get('.btn').click();
        cy.url().should('contain', '/register');
        cy.get('.nav-link').should('have.length', 3)

    })

    it('Go to gallery app registration page and input mismatched passwords', () => {



        // let email = Math.floor(Math.random() * 9999999);
        // email = String(email) + "@gmail.com"
        cy.get('#first-name').type(firstName);
        cy.get('#last-name').type(lastName);
        cy.get('#email').type(email);
        cy.get('#password').type(password);
        cy.get('#password-confirmation').type(password + 1);
        cy.get('.form-check-input').click();
        cy.get('.btn').click();
        cy.url().should('contain', '/register');
        cy.get('.nav-link').should('have.length', 3)

    })

    it('Go to gallery app registration page and input incorrect mail form', () => {

        // let email = Math.floor(Math.random() * 9999999);
        // email = String(email) + "gmail.com"

        cy.get('#first-name').type(firstName);
        cy.get('#last-name').type(lastName);
        cy.get('#email').type("uros.leticgmail.com");
        cy.get('#password').type(password);
        cy.get('#password-confirmation').type(password);
        cy.get('.form-check-input').click();
        cy.get('.btn').click();
        cy.url().should('contain', '/register');
        cy.get('.nav-link').should('have.length', 3)

    })

    it('Go to gallery app registration page and input already existing email', () => {

        cy.get('#first-name').type(firstName);
        cy.get('#last-name').type(lastName);
        cy.get('#email').type(existingEmail);
        cy.get('#password').type(password);
        cy.get('#password-confirmation').type(password);
        cy.get('.form-check-input').click();
        cy.get('.btn').click();
        cy.url().should('contain', '/register');
        cy.get('.nav-link').should('have.length', 3)

    })

    it('Go to gallery app registration page, input password below 8 characters', () => {

        // let email = Math.floor(Math.random() * 9999999);
        // email = String(email) + "@gmail.com"
        cy.get('#first-name').type(firstName);
        cy.get('#last-name').type(lastName);
        cy.get('#email').type(email);
        cy.get('#password').type(password.substring(2));
        cy.get('#password-confirmation').type(password.substring(2));
        cy.get('.form-check-input').click();
        cy.get('.btn').click();
        cy.url().should('contain', '/register');
        cy.get('.nav-link').should('have.length', 3)

    })

    it('Go to gallery app registration page, verify password and pass confirmation input is in hidden form', () => {


        cy.get('#password').type(password);
        cy.get('#password-confirmation').type(password);
        cy
            .get('#password')
            .should('have.attr', 'type', "password");
        cy
            .get('#password-confirmation')
            .should('have.attr', 'type', "password");

    })

    it('Go to gallery app registration page, test password size length, 1000 chars', () => {

        function randomString(length = 1000) {
            return [...Array(length + 10)].map((value) => (Math.random() * 1000000).toString(36).replace('.', '')).join('').substring(0, length);
        };

        var randPassword = randomString();

        let email = Math.floor(Math.random() * 9999999);
        email = String(email) + "@gmail.com"
        // Cypress.env()
        // console.log(Cypress.env('register_url'))
        // console.log("URLsS");
        // console.log(url);
        cy.get('#first-name').type(firstName);
        cy.get('#last-name').type(lastName);
        cy.get('#email').type(email);
        cy.get('#password').type(randPassword);
        cy.get('#password-confirmation').type(randPassword);
        cy.get('.form-check-input').click();
        cy.get('.btn').click();
        cy.wait(3000);
        cy.url().should('contain', '/register');
        cy.get('.nav-link').should('have.length', 3)

    })

    it('Go to gallery app registration page, attempt registration using password with no numbers', () => {

        cy.get('#first-name').type(firstName);
        cy.get('#last-name').type(lastName);
        cy.get(locators.Login.emailInput).type(existingEmail);
        cy.get(locators.Login.passwordInput).type(passwordWithoutNumber);
        cy.get('#password-confirmation').type(passwordWithoutNumber);
        cy.get('.btn').click();
        cy.url().should('contain', '/register');

    })

});
