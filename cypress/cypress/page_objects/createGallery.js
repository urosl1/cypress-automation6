class CreateGallery {

    get title() {
        return cy.get('#title');
    }

    get description() {
        return cy.get('#description');
    }

    get images() {
        // return cy.get([@type='url']);
        return cy.get('.form-control').eq(2);

    }

    get submit() {
        return cy.get('.btn.btn-custom').eq(0);
    }

    get clickarrowDown() {
        this.arrowDown.click();
    }

    get image2() {
        return this.galleryInputParent.find("input").eq(3);
    }

    get addImageBtn() {
        return cy.get(".container button").eq(2);
    }


    imageMove(title, desc, image, image2) {
        this.title.type(title);
        this.description.type(desc);
        this.imageInput.type(image);
        this.addImageBtn.click();
        this.image2.type(image2);
        this.clickarrowDown();
        this.submit();
    }

    createGall(title, description, image) {

        this.title.type(title);
        this.description.type(description);
        this.images.type(image);
        this.submit.click();

    }

}

export const createGallery = new CreateGallery();




