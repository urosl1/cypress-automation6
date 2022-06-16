class CreateGallery {
    get titleInput() {
        return cy.get('#title')
    }

    get descriptionInput() {
        return cy.get('#description')
    }

    get imageInput() {
        return cy.get('input').last();
    }

    get submitBtn() {
        return cy.get('button').eq(-2);
    }

    createGallery(title, desc, image) {
        this.titleInput.type(title)
        this.descriptionInput.type(desc)
        this.imageInput.type(image)
        this.submitBtn.click()
    }
}

export const createGalery = new CreateGallery()