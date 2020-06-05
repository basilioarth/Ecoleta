// obs: o require pede um pacote existente lá na pasta node_modules
const express = require("express")
// com essa linha podemos usar o express para iniciar o servidor
const server = express()
// a variável express recebeu o retorno da função require. Esse retorno também é uma função e agora estamos executando a função express e guardando o seu 
// retorno na constante server. Portanto, a variável server será um objeto de servidor e, a partir dela, poderemos usar várias coisas. Ref 1.

//============================================================== Configurando a pasta publica ============================================================//
server.use(express.static("public"))
// Aqui estamos especificando que os arquivos de dentro da pasta public poderão ser acessados diretamente pela url
// Além disso, essa configuração permite que os caminhos de acesso entre os arquivos html e css permaneçam os mesmos sem problemas de não encontrar o
// diretório correto devido a refatoração dos arquivos.

//============================================================= Utilizando template engine  ==============================================================//
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})
// O primeiro argumento é a pasta onde estão os nossos arquvios html. O segundo argumento é um objeto.
// O primeiro atributo desse objeto recebe a variável que está representando o servidor express.
// O segundo atributo especifica que não utilizaremos a memória cache (o que evita de trabalharmos com um arquivo desatualizado que estava na chace e por
// isso foi escolhido)

//=================================================== Configurando os caminhos/rotas da minha aplicação ==================================================//

// página inicial
server.get("/", (req, res) => {
    return res.render("index.html", { title: "Um título "})

    /*res.sendFile(__dirname + "/views/index.html")
    __dirname retorna o nome do diretório onde esse arquivo está*/
})
// Configuramos o caminho "/" para que o nosso servidor execute a arrow function passada como parâmetro.
// Quando ele executar a função, obterá uma resposta. Nesse caso inicial a resposta é: Cheguei aqui

server.get("/create-point", (req, res) => {
    return res.render("create-point.html")

})

server.get("/search", (req, res) => {
    return res.render("search-results.html")

})

// Uma das coisas que podemos fazer <Ref 1> é ligar o servidor:
server.listen(3000)
// ligamos o servidor e especificamos que a sua porta de acesso será a 3000
