class RegisterPage {
    get firstName() {
        return cy.get('#first-name');
    }

    get lastName() {
        return cy.get('#last-name');
    }

    get email() {
        return cy.get('#email');
    }

    get password() {
        return cy.get('#password');
    }

    get passwordConfirmation() {
        return cy.get('#password-confirmation');
    }

    get checkBox() {
        return cy.get('.form-check-input');
    }

    get btn() {
        return cy.get('.btn');
    }

    register(firstName, lastName, email, password, passwordConfirmation) {

        this.firstName.type(firstName);
        this.lastName.type(lastName);
        this.email.type(email);
        this.password.type(password);
        this.passwordConfirmation.type(passwordConfirmation);
        this.checkBox.click();
        this.btn.click();

    }

}

export const registerPage = new RegisterPage();







