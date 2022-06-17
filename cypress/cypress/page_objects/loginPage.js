class LoginPage {
    get loginBtn() {
        return cy.get(".nav-link").eq(1);
    }

    get emailInput() {
        return cy.get("#email");
    }

    get passwordInput() {
        return cy.get("#password");
    }

    get submitBtn() {
        return cy.get("button");
    }

    get myGalleriesBtn() {
        return cy.get(".nav-link").eq(1);
    }

    get logoutBtn() {
        return cy.get(".nav-link").last();
    }

    get errorMessage() {
        return cy.get('p[class="alert alert-danger"]');
    }

    get loginHeading() {
        return cy.get("h1");
    }

    clickLoginBtn() {
        this.loginBtn.click();
    }

    login(email, password) {
        this.emailInput.type(email);
        this.passwordInput.type(password);
        this.submitBtn.click();
    }
}

export const loginPage = new LoginPage();
