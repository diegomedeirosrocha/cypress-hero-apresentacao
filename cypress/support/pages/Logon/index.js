const element = require('./elements').ELEMENTS;

class Logon {
    openPage() {
        cy.visit('http://localhost:3000/')
    }

    realizarLogin() {
        cy.get(element.id).type(Cypress.env('idOngCadastrada'))
        cy.get(element.cadastrar).click()
    }

    naoTenhoCadastro() {
        cy.get(element.naoTenhoCadastro).click()
    }
}

export default new Logon()