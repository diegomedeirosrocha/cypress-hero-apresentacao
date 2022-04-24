/// <reference types="Cypress" />

import Logon from '../support/pages/Logon';
import Register from '../support/pages/Register';
import Profile from '../support/pages/Profile';
import RegisterIncident from '../support/pages/RegisterIncident';

describe('Tests Be the Hero - with page Objets', () => {

    it('Logon - web', () => {
        Logon.openPage()
        Logon.realizarLogin()
    });

    it('Cadastro ong - web', () => {
        Logon.openPage()
        Logon.naoTenhoCadastro()
        
        Register.cadastroOng()

        Register.validarCadastroComSucesso()
    });

    it('cadastro incidente - web', () => {
        cy.login();
        Profile.cadastrarNovoCaso()
        RegisterIncident.cadastroIncidente()
        RegisterIncident.validarCadastroIncidenteComSucesso();

    });

    it('logout - web', () => {
        cy.login();
        Profile.logout();
    });

    it('delete incidente - web', () => {
        cy.login();
        cy.createIncident();
        //cy.get('li > button > svg > path').click()

        //TODO
    });


});


//cy.contains('1 item left').should('exist')
