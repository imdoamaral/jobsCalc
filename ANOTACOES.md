# Iniciando o projeto

`$ npm init -y`
`$ npm install express`

# Iniciando o servidor

- Criar pasta `src` na raiz do projeto
- Criar arquivo `server.js` dentro de `/src`

# Adicionando o nodemon

- Instalar o nodemon como dependência de desenvolvimento `$ npm i nodemon -D`
- Em `package.json` mudar o VALOR da chave "main" para "src/server.js"
- Ainda em `package.json` criar chave "dev" com o valor "nodemon ."
- Rodar o script "dev" com `$ npm run dev`

# Criando views

- Criar uma pasta de nome `views` dentro de `/src`
- Adicionar todos documentos .html a essa pasta `/views`

# Criando rotas

- Criar um arquivo chamato `routes.js` na pasta `/src`
- Corrigir o nome das views: remover [.html], adicionar [/] antes dos links e substituir [./] por [/]

# Adicionando EJS

`$ npm install ejs`
- Criar view engine
- Mudar de [.html] para [.ejs]
- Mudar o formato de envio em `/routes` de [.sendFile] para [.render]
- Ainda em `/routes`, eliminar `/` e `.html` das rotas
- OBS: o EJS busca as rotas na pasta `/views` do diretório RAIZ

# Componentizar os elementos