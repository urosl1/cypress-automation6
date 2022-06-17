import { createGallery } from "../page_objects/createGallery";
import { loginPage } from "../page_objects/loginPage";

describe("login POM", () => {
    let validEmail = "uros.letic00@gmail.com";
    let validPassword = "12345678";
    let title = "naslov";
    let description = "opis";
    let images = "https://static.remove.bg/remove-bg-web/eb1bb48845c5007c3ec8d72ce7972fc8b76733b1/assets/start-1abfb4fe2980eabfbbaaa4365a0692539f7cd2725f324f904565a9a744f8e214.jpg";

    before("visit login page", () => {
        // cy.loginViaBackend();
        cy.visit("/login");
    });

    it.only('login', () => {
        cy.intercept({
            method: 'POST',
            url: 'https://gallery-api.vivifyideas.com/api/auth/login'
        }).as('login')

        loginPage.login(validEmail, validPassword);

        cy.wait('@login').then(interception => {
            expect(interception.response.statusCode).eq(200)
            // expect(interception.response.body.access_token).should('exist')
               cy.url().should("not.include","/login")

        })
    })

    xit("valid login using POM", () => {
        cy.intercept({
            method: "POST",
            url: "https://gallery-api.vivifyideas.com/api/auth/login",
        }).as("validLogin");

        cy.url().should("include", "/login");
        loginPage.login(validEmail, validPassword);
        cy.wait("@validLogin").then((interception) => {
            expect(interception.response.statusCode).to.exist;
            expect(interception.response.statusCode).eq(200);
        });

        cy.url().should("not.include", "/login");
        loginPage.loginBtn.should("be.visible");

        cy.loginViaBackend();
        // cy.visit("/create");
    });

    xit("logout", () => {
        cy.intercept({
            method: "POST",
            url: "https://gallery-api.vivifyideas.com/api/auth/logout",
        }).as("logout");

        loginPage.logoutBtn.click();
        cy.wait("@logout").then((interception) => {
            expect(interception.response.statusCode).eq(200);
        });
    });

    it("Create Gallery", () => {
        cy.visit('/login');
        loginPage.login(validEmail, validPassword);
        cy.wait(3000);

        cy.visit('/create');
        cy.intercept({
            method: "Post",
            url: 'https://gallery-api.vivifyideas.com/api/galleries'
        }).as('createGallery')

        createGallery.createGall(
            title,
            description,
            images
        );

        cy.wait('@createGallery').then(interception => {
            let galleryId = interception.response.body.id
            cy.visit(`/galleries/$(galleryId)`)
            cy.visit('galleries/' + galleryId)
            cy.get('id').should('have.text', createGallery.title)
        })

    });

});
