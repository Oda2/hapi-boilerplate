# Hapi Boilerplate

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/fc69496b2eb94fcd8e34ee7f76527281)](https://app.codacy.com/app/Oda2/hapi-boilerplate?utm_source=github.com&utm_medium=referral&utm_content=Oda2/hapi-boilerplate&utm_campaign=badger)
[![CircleCI](https://circleci.com/gh/Oda2/hapi-boilerplate/tree/master.svg?style=shield)](https://circleci.com/gh/Oda2/hapi-boilerplate/tree/master)
[![Coverage Status](https://coveralls.io/repos/github/Oda2/hapi-boilerplate/badge.svg?branch=master)](https://coveralls.io/github/Oda2/hapi-boilerplate?branch=master)
[![Maintainability](https://api.codeclimate.com/v1/badges/2c9ae7c3b080774f2a22/maintainability)](https://codeclimate.com/github/Oda2/hapi-boilerplate/maintainability)
[![Known Vulnerabilities](https://snyk.io/test/github/Oda2/hapi-boilerplate/badge.svg?targetFile=package.json)](https://snyk.io/test/github/Oda2/hapi-boilerplate?targetFile=package.json)


Este é um boilerplate baseado no projeto [hapi-api-boilerplate](https://github.com/FernandoCagale/hapi-api-boilerplate) que utiliza Hapi.js e Sequelize, porém foi alterado para aplicar os frameworks Hapi.js v17+ e Mongoose (MongoDb).

#### Estrutura do Projeto

* **src** é o diretório principal do código-fonte.
  * **core** é o diretório onde fica os arquivos importantes para dar o bootstrap do sistema
    * **plugins** é o diretório aonde fica os plugins a serem carregados pelo bootstrap.
    * **utils** é o diretório aonde fica algumas ferramentas de auxilio para o bootstrap (Variáveis de ambiente fica nesse diretório no arquivo `load.js`)
  * **modules** é o local onde encontram-se os arquivos das entidades que serão utilizadas na API.
  * **test** é o local responsável por carregar todo o ambiente de teste.

#### Entidades e Escopos
* **src**
    * **modules**

O diretório modules, é o local onde será criada as entidades da API, como por exemplo `usuario`.

* **usuario**
   * **admin** `escopo`
      * **test**
        * **usuario.admin.spec.js**
      * **usuario.admin.controller.js**
      * **usuario.admin.routes.js**
      * **usuario.admin.validation.js**
   * **public** `escopo`
      * **usuario**
        * **usuario.public.spec.js**
      * **usuario.public.controller.js**
      * **usuario.public.routes.js**
      * **usuario.public.validation.js**
   * **usuario.schema.js**

Na maioria dos casos, precisamos de vários escopos de acesso em uma API. Na estrutura atual existem dois tipos de escopos, admin no qual somente o administrador terá acesso, e public, no qual não é necessário estar logado para enviar uma requisição. Dessa forma, estamos separando as responsabilidades entre os escopos, o que torna mais fácil a manutenção do mesmo.

É obrigatório seguir a estrutura descrita acima, {entidade}.{escopo}.{controller}.js

Você terá os arquivos: `{entidade}.{escopo}.routes.js`, `{entidade}.{escopo}.validation.js` e `{entidade}.{escopo}.controller.js`.
* `usuario.public.validation.js` neste arquivo é especificado as regras para cada endpoint com base no arquivo `usuario.schema.js`. . Podendo haver outras regras se necessário.
* `usuario.public.controller.js` é o arquivo responsável pelas regras de negócios.
* `usuario.public.routes.js`  é o arquivo que contém as configurações de roteamento do Hapijs.

Geralmente o arquivo `{entidade}.schema.js`  é comum entre os escopos, podendo ficar na raiz do `modules` de cada entidade.
* `usuario.schema.js` regras de validações como `header`, `params`, `query` entre outras.

#### Algumas features implementadas na API

* `hapi-auth-jwt2` Autenticação via token.
* `Swagger` Para documentação da API.
* `Mongoose` Para conexão com o banco de dados MongoDB

### Algumas features implementadas na estrutura

* `Continuous Integration` Modelos prontos para integração com:
  * `Circleci`
  * `BitBucket pipeline` Modelo pré definido com build automatizado no Heroku
  * `Gitlab CI`

#### Qualquer sugestão de melhorias ou PR será bem-vinda.

## License
Licensed under [MIT](https://github.com/Oda2/hapi-boilerplate/blob/master/LICENSE)
