const element = require('./elements').ELEMENTS;

class Profile {

    cadastrarNovoCaso() {
        cy.get(element.cadastrarNovoCaso).click()
    }

    logout() {
        cy.get(element.logout).click()
    }

}

export default new Profile()