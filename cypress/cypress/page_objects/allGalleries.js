class AllGalleries {

    get allGalleries() {
        return cy.get('a[href="/"]');

    }

    get myGalleries() {
        return cy.get('a[href="/my-galleries"]');
    }

    get createGallery() {
        return cy.get('a[href="/create"]');
    }

    get logout() {
        return cy.get('.nav-link nav-buttons');
    }

    get searchBox() {
        return cy.get(':text');
    }

    get filterBtn() {
        return cy.get('.btn.btn-outline-secondary.input-button');
    }


    search(searchBox) {

        this.searchBox.type(searchBox);
        this.filterBtn.click();

    }

}

export const allGalleries = new AllGalleries();






