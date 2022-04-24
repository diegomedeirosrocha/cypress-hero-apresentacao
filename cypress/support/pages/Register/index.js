const element = require('./elements').ELEMENTS;

class Register {
    cadastroOng() {
        cy.get(element.name).type('diego')
        cy.get(element.email).type('testeong@gmail.com')
        cy.get(element.whatsapp).type('11999992222')
        cy.get(element.city).type('Sao Paulo')
        cy.get(element.uf).type('SP')

        cy.server()
        cy.route('POST', '**/ongs').as('postInsertOng')

        cy.get(element.cadastrar).click()
    }

    validarCadastroComSucesso() {
            cy.wait('@postInsertOng').then((xhr) => {
            cy.log(xhr.response)
            expect(xhr.status).be.eq(200);
            expect(xhr.response.body).has.property('id');
            expect(xhr.response.body.id).is.not.null;
            cy.log(xhr.response.body.id)
        })
    }
}

export default new Register()