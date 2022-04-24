const element = require('./elements').ELEMENTS;

class RegisterIncident {
    cadastroIncidente() {
        cy.get(element.title).type('cachorro doente')
        cy.get(element.description).type('com problema na pata')
        cy.get(element.value).type('140.00')

        cy.server()
        cy.route('POST', '**/incidents').as('insertIncident')
        cy.get(element.cadastrar).click()
    }

    validarCadastroIncidenteComSucesso() {
        cy.wait('@insertIncident').then((xhr) => {
            cy.log(xhr.response) //facilitar analise
            expect(xhr.status).be.eq(200);
        })
    }
}

export default new RegisterIncident()