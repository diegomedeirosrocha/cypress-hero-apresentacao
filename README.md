## Objetivo
Demonstrar o uso do Cypress no dia a dia: recursos e funcionalidades

## pastas do projeto
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

# Passos rodar aplicação local:

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
### Tecnologias
As seguintes ferramentas foram usadas na construção do projeto:

    JavaScript
    Cypress

## Autores-Colaboradores

* **Diego Rocha** - *Create project*

## Créditos
* **Samuel Agilizei** - *creditos - metodo "login" abaixo:* 
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


# CYPRESS - OUTROS ITENS

## recursos
OBS: itens com '[🔥🔥🔥]' -> novidades para automação web...

cypress possibilita automação de:
- api rest [🔥🔥🔥]

- frontend
    get (id fixo, data-cy, selector)
    type (escrita valores em campos)
  
  - mapear paginas: page objects / actions
        com actions - https://github.com/wlsf82/buger-eats-cypress-discovery
        com page objet - https://github.com/Tiago0Br/buger-eats-cypress-discovery
        https://www.cypress.io/blog/2019/01/03/stop-using-page-objects-and-start-using-app-actions/
        https://github.com/bahmutov/test-todomvc-using-app-actions

  - algo bem discutido é uso ou não do page objects (usar ou não em cypress), vale dar uma olhada no video do Walmyr Filho:
    - video https://www.youtube.com/watch?v=YyU8wHm5cv4
      - 04m30s -> page objects desnecessario, 5 ou 1k paginas
      - 16m50s a 20m30s ->  pq nao usar P.O.
        - ele cita que costumamos ter poucos testes login, 1 teste sucesso (que vão usar login usando a página via front)
        - demais testes que não são realmente teste de login, ele faria o login via backend e testes ficarem mais robustos
        - ele cita o curso 'interdiario', funcionalidade cy.request
   

  - permite capturar o resultado do request, apos clicar em um campo da tela [🔥🔥🔥]
    - response status: 200, 201, 204... [🔥🔥🔥]
    - validar response body, retornado exemplo 'id 571045' [🔥🔥🔥]

```js
    //preparando -> 
    cy.server()
    cy.route('POST', '**/ongs').as('postInsertOng')

    //acao - click objecto da tela
    cy.get(element.cadastrar).click()  

    //validar resultado do click (request)
    cy.wait('@postInsertOng').then((xhr) => {
    cy.log(xhr.response)
        expect(xhr.status).be.eq(200);
        expect(xhr.response.body).has.property('id');
        expect(xhr.response.body.id).is.not.null;
        cy.log(xhr.response.body.id)
    })
```

### exportar página
```js
    export default new HomePage();
```

### aliases
```js
    cy.route('POST', '**/incidents').as('insertIncident')
    cy.get(".element").as("myElement");
```
    https://github.com/janmanfai/cypress-cheat-sheet#aliases

### Comandos mais usados
    "Comandos usados com frequência alta - 3 estrelas starstarstar" -> https://github.com/samlucax/cypress-learning-checklist
    https://github.com/janmanfai/cypress-cheat-sheet#aliases
    

### Como mostrar documentação cypress ao passar mouse em cima do comando, exemplo: cypress.visit(''), coloque essa linha em cima do arquivos:
```js
    "/// <reference types="Cypress" />"
```

### Extensões do VSCode que eu uso com Cypress | AgiliDrops #06
https://www.youtube.com/watch?v=JGVB97ns0NQ

- ES6 Mocha Snippets - Cory Noonan
- Cypress Snippets
- Add Only
- Fold Plus
- Bracket Pair Colorizer 2
- Material Icon Theme
- Cypress Helper
- Visual Studio IntelliCode

### cypress essential (mind maping)
    https://whimsical.com/cypress-essencial-XpeRr4NebcFJkC2Lpwm4W4
    https://github.com/samlucax/cypress-essencial-mindmap

### sites bons para treinar treinar automação
    https://github.com/cypress-io/cypress-realworld-app

### videos
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



## Achou interessante o material?

**_Deixe uma star ⭐ no repositório e um follow no [meu perfil](https://github.com/diegomedeirosrocha), isso me incentiva a criar conteúdos para comunidade**