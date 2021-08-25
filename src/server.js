// chama o pacote 'express'
// e o armazena em uma constante
const express = require('express')

// executa a constante/função 'express'
// e armazena seu retorno
const server = express()

server.set('view engine', 'ejs')

const routes = require('./routes')

// executa a propriedade/função .listen
// que esta disponivel em 'server'
server.listen(3000, () => console.log('rodando'))

// habilitar arquivos statics
server.use(express.static("public"))

// routes
server.use(routes)