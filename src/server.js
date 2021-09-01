// chama o pacote 'express'
// e o armazena em uma constante
const express = require('express')
const routes = require('./routes')
const path = require('path')

// executa a constante/função 'express'
// e armazena seu retorno
const server = express()

// usando a template engine
server.set('view engine', 'ejs')

// mudando a localizacao da pasta views
server.set('views', path.join(__dirname, 'views'))

// executa a propriedade/função .listen
// que esta disponivel em 'server'
server.listen(3000, () => console.log('rodando'))

// habilitar arquivos statics
server.use(express.static("public"))

// usar o req.body
server.use(express.urlencoded({ extended : true }))

// routes
server.use(routes)
