// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


Cypress.Commands.add("createOng", () => {
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
        cy.log(response.body)
        expect(response.body.id).is.not.null;
        
        cy.log(response.body.id)
        
        //export variable to use future
        Cypress.env('idOngCadastrada', response.body.id)
    })
})


Cypress.Commands.add("login", () => {
    //CREDITS OF METHOT -> CREDITS SAMUEL YOUTUBE
    //--> https://github.com/samlucax/youtube-cypress/blob/video2/cypress/support/commands.js

    cy.visit('http://localhost:3000/profile', {
        onBeforeLoad: (win) => {
            win.localStorage.clear();
            win.localStorage.setItem('ongId', Cypress.env('createdOngId'));
            win.localStorage.setItem('ongName', 'Gatos queridos');
        }
    });
})

//create new indident and capture id of createIncident
//use: data factory of test
Cypress.Commands.add("createIncident", () => {
    cy.login()
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

           Cypress.env('insertIncidentId', response.body.id)
    });
})