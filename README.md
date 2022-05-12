# Projeto
### Objetivo
Demonstrar o uso do Cypress no dia a dia: recursos e funcionalidades

### Tecnologias
As seguintes ferramentas foram usadas na construção do projeto:

    JavaScript
    Cypress

### Pastas do projeto
- cypress-hero/cypress/integration (ficam os testes)
    - unico_arquivo_spec.js             # exemplo sem page objets - tudo em um unico arquivo
    - testes_com_page_objects_spec.js   # exemplo com page objets - clean

- cypress-hero/cypress/plugins

- cypress-hero/cypress/support/commands.js
    comandos criados, podemos usa-los usando -> "cy.login()"

- cypress-hero/cypress/support/index.js
    exemplo ter um 'beforeEach' -> para ser executado antes de todos testes

- cypress-hero/cypress/support/pages
    - paginas mapeadas = Logon, Profile, Register / RegisterIncident)
    - cypress-hero/cypress/support/pages/Logon/elements.js - campos
    - cypress-hero/cypress/support/pages/Logon/index.js - funcoes (chamar nos scripts)


### Autores-Colaboradores

* **Diego Rocha** - *Create project*
* **Samuel Agilizei** - *Creditos - metodo abaixo:* 
```js
    Cypress.Commands.add("login", () => {
        cy.visit('http://localhost:3000/profile', {
            onBeforeLoad: (win) => {
                win.localStorage.clear();
                win.localStorage.setItem('ongId', Cypress.env('createdOngId'));
                win.localStorage.setItem('ongName', 'Gatos queridos');
            }
        });
    })
```
* [link] https://github.com/samlucax/youtube-cypress/blob/video2/cypress/support/commands.js


# Passos Rodar Aplicação Local:
### Pré-requisitos:
    Windows, macbook, linux

### Executar:
    documentação completa = https://docs.cypress.io/guides/getting-started/installing-cypress#Switching-browsers

  1) acessar pasta -> cypress-hero/backend
    npm install
    npm start

  2) acessar pasta -> cypress-hero/frontend
    npm install
    npm start

  3.1) acessar pasta -> cypress-hero
    npm install

  3.2) rodar o comando
```
  ./node_modules/.bin/cypress open
  ou 
  npm run cypress:open    **OBS: para usar o comando, veja o link: https://docs.cypress.io/guides/getting-started/installing-cypress#Adding-npm-scripts
```



# Porque Deveria estudar sobre cypress para automação Web?
### Itens com '[🔥🔥🔥]' são novidades:
- api rest [🔥🔥🔥]
- frontend
    get (id fixo, data-cy, selector)
    type (escrita valores em campos)
- frontend: ao clicar em um botao, conseguimos 'interceptar o resultado da requisicao' [***] [🔥🔥🔥]
    response status: 200, 201, 204... [🔥🔥🔥]
    response body: id 571045 [🔥🔥🔥]

### interceptar o resultado do request [***]
```js
    //preparando
    cy.server()
    cy.route('POST', '**/ongs').as('postInsertOng')

    //acao - click botao
    cy.get(element.cadastrar).click()  

    //validar resultado retornado
    cy.wait('@postInsertOng').then((xhr) => {
    cy.log(xhr.response)
        expect(xhr.status).be.eq(200);
        expect(xhr.response.body).has.property('id');
        expect(xhr.response.body.id).is.not.null;
        cy.log(xhr.response.body.id)
    })
```



# Cypress - Recursos
### Exportar página
```js
    export default new HomePage();
```

### Aliases
```js
    cy.route('POST', '**/incidents').as('insertIncident')
    cy.get(".element").as("myElement");
```
    https://github.com/janmanfai/cypress-cheat-sheet#aliases

### Como mostrar documentação cypress ao passar mouse em cima do comando, exemplo: cypress.visit(''), coloque essa linha em cima do arquivos:
```js
    "/// <reference types="Cypress" />"
```



# Outros Links
### Actions
   - https://github.com/wlsf82/buger-eats-cypress-discovery
   - https://github.com/bahmutov/test-todomvc-using-app-actions
   
### Page object
   - https://github.com/Tiago0Br/buger-eats-cypress-discovery
   - https://www.cypress.io/blog/2019/01/03/stop-using-page-objects-and-start-using-app-actions/
   

### Usar ou não Page Objects?
    Walmyr Filho falou isso no video: https://www.youtube.com/watch?v=YyU8wHm5cv4
    04:30 ele cita porque o page objects é desnecessario, tendo um sistema de 5 ou 1.000 paginas (exemplo)
    16:50 à 20:30 ele cita umas das grandes vantagens do uso do cypress:
    - costumamos ter poucos testes login, 1 teste sucesso (neste cenário usaremos a página para a automação - via front)
    - demais testes, que não são teste de login, faria o login via backend, deste modo os testes ficariam mais robustos
        - funcionalidade cy.request também é citada no curso 'Testes automatizados com Cypress (intermediário)' https://www.udemy.com/course/testes-automatizados-com-cypress-intermediario/

### Comandos mais usados cypress - 3 estrelas stars
    https://github.com/samlucax/cypress-learning-checklist

### Cypress essential (mind maping)
    https://whimsical.com/cypress-essencial-XpeRr4NebcFJkC2Lpwm4W4
    https://github.com/samlucax/cypress-essencial-mindmap

### Site bom para treinar automação
    https://github.com/cypress-io/cypress-realworld-app

### Videos
    Cypress Samuel agilizei
        playlist 4 videos 'Cypress: do zero ao reporte' - https://www.youtube.com/watch?v=gTRMuWCp8mE&list=PLnUo-Rbc3jjyx5BVnG8MB7vNd5ecu2yP1
        codigo fonte = https://github.com/samlucax/youtube-cypress/tree/master

    end to end
        https://slides.com/bahmutov/cypress-testing
    
    Flexible Data Setup & Caching for Cypress End-to-End Tests
        https://slides.com/bahmutov/flexible-cypress-data
        https://github.com/bahmutov/cypress-data-session

    create data -> 'The test should create all the data it needs'
        https://slides.com/bahmutov/flexible-cypress-data#/6/0/1



# Ferramentas

### Visual code - extensões para cypress
https://www.youtube.com/watch?v=JGVB97ns0NQ

- ES6 Mocha Snippets - Cory Noonan
- Cypress Snippets
- Add Only
- Fold Plus
- Bracket Pair Colorizer 2
- Material Icon Theme
- Cypress Helper
- Visual Studio IntelliCode


## Achou interessante o material?

**_Deixe uma star ⭐ no repositório e um follow no [meu perfil](https://github.com/diegomedeirosrocha), isso me incentiva a criar conteúdos para comunidade**