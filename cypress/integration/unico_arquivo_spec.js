// type definitions for Cypress object "cy" -> https://apimirror.com/cypress/guides/tooling/intelligent-code-completion
/// <reference types="Cypress" />
// before(() => {
//   })

describe('Tests Be the Hero - in one file', () => {
    // beforeEach(() => {
    //   })

    it('Cadastro ong - web', () => {
        cy.log('start cadastron ONG - web')

        cy.visit("http://localhost:3000/")
        cy.get('.back-link').click()
    
        cy.contains('p').should('exist')

        cy.get('[data-cy="name"]').type('diego')
        cy.get('[data-cy="email"]').type('testeong@gmail.com')
        cy.get('[data-cy="whatsapp"]').type('11999992222')
        cy.get('[data-cy="city"]').type('Sao Paulo')
        cy.get('[data-cy="uf"]').type('SP')
        
        //https://docs.cypress.io/api/commands/route
        cy.server()     //obrigatory before use 'cy.route
        cy.route('POST', '**/ongs').as('postInsertOng') //'**/' use to ignore parts left in url
                                                        // aliases of 'postInsertOng' -> https://github.com/janmanfai/cypress-cheat-sheet
        
        cy.get('[data-cy="submit"]').click() //click botao tela
        
        cy.wait('@postInsertOng').then((xhr) => {
            expect(xhr.status).be.eq(200);
            expect(xhr.response.body).has.property('id');
            expect(xhr.response.body.id).is.not.null;
        }) 

    });

    it('Cadastro ong - API', () => {
        cy.server()
        cy.request({
            method: 'POST',
            url: 'http://localhost:3333/ongs',
            body: {
                "name": "ong dois",
                "email": "ong99@gmail.com",
                "whatsapp": "11999992222",
                "city": "Sao Paulo",
                "uf": "SP"
            }
        }).then((response) => {
            expect(response.status).be.eq(200);
            expect(response.body.id).is.not.null;
        })
    });

    it('Logon - web', () => {
        cy.visit('http://localhost:3000/')
        cy.get('input').type(Cypress.env('idOngCadastrada'))

        cy.server()
        cy.route('GET', '**/profile').as('logonUser')

        cy.get('.button').click()
        
        cy.wait('@logonUser').then((xhr) => {
            expect(xhr.status).be.eq(200);
        })

        cy.get('h1').should('be.visible')
    });

    it('cadastro incidente - web', () => {
        cy.login();                         //create dynamic

        cy.get('.button').click()
        
        let title = 'cachorro doente'
        let textArea = 'problema na pata'
        let valueItem = '140.00'

        cy.get('[placeholder="Título do caso"]').type(title) //OBS -> não é boa pratica
        cy.get('textarea').type(textArea)                    //OBS -> não é boa pratica
        cy.get('[placeholder="Valor em reais"]').type(valueItem) //OBS -> não é boa pratica

        cy.get('[placeholder="Título do caso"]').should('have.value', title)
        cy.get('textarea').should('have.value', textArea)
        cy.get('[placeholder="Valor em reais"]').should('have.value', valueItem)

        cy.server()
        cy.route('POST', '**/incidents').as('insertIncident')
        
        cy.get('.button').click() //click botao

        cy.wait('@insertIncident').then((xhr) => {
            expect(xhr.status).be.eq(200);
        })
    });

    it('logout - web', () => {
        cy.login();
        cy.get('header > button > svg').click()
    });

    //EXAMPLE TEST API
    it('cadastro incidente - api', () => {
        cy.login();


        cy.server()
        cy.request({
            method: 'POST',
            url: 'http://localhost:3333/incidents',
            headers: { 'Authorization': `${ Cypress.env('createOng') }`, },
            body: {
                    "title":"cachorro",
                    "description":"nao anda",
                    "value":"350"
                }
        }).then((response) => {
            expect(response.status).be.eq(200);
            cy.log(response.body)
            expect(response.body.id).is.not.null;
            cy.log(response.body.id)
            
            //export to variable
            //Cypress.env('idInsertIncident', response.body.id)
        })
    });

    it('delete incidente - web', () => {
        cy.login();
        cy.createIncident();
        //cy.get('ul > :nth-child(1) > button > svg').click()
        
        //TODO
    });

    //example test - skip
    it.skip('teste nao sera executado', () => {
        cy.log('oi')
    });

//    example '.only': run only this test 
 //   it.only('teste skip', () => {
 //       cy.log('oi')
  //  });
});

