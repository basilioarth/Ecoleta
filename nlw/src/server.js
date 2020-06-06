// obs: o require pede um pacote existente lá na pasta node_modules
const express = require("express")
// com essa linha podemos usar o express para iniciar o servidor
const server = express()
// a variável express recebeu o retorno da função require. Esse retorno também é uma função e agora estamos executando a função express e guardando o seu 
// retorno na constante server. Portanto, a variável server será um objeto de servidor e, a partir dela, poderemos usar várias coisas. Ref 1.

const db = require("./database/db.js")
// pegando o db que foi exportado dentro do arquivo db.js através do module.exports = db

//============================================================== Configurando a pasta publica ============================================================//
server.use(express.static("public"))
// Aqui estamos especificando que os arquivos de dentro da pasta public poderão ser acessados diretamente pela url
// Além disso, essa configuração permite que os caminhos de acesso entre os arquivos html e css permaneçam os mesmos sem problemas de não encontrar o
// diretório correto devido a refatoração dos arquivos.

//==================================================== Habilitando o uso do req.body na nossa aplicação ==================================================//
server.use(express.urlencoded({ extedend: true }))

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
//    console.log(req.query)
    // Nos da acesso às Query Strings (: Cadeias de Consulta) da nossa url 
    // Em outras palavras, nos da acesso às coisas que ficam escritas na url da página

    return res.render("create-point.html")
})

server.post("/savepoint", (req, res) => {    
    //console.log(req.query)
    // caso tentemos acessar os dados enviados pelo formulario utilizando o req.query, obteremos um objeto vazio.
    // isso se justifica por não termos mais nada escrito na url da página

    //console.log(req.body)
    // req.body: o corpo da nossa requisição. No caso dessa aplicação, o corpo do nosso formulário

    /* Inserindo dados no Banco de Dados com comandos SQL */
    const query = 
    `INSERT INTO places (
        image,
        name,
        address,
        address2,
        state,
        city,
        items
    ) VALUES (?,?,?,?,?,?,?);`
    
    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ]

    function afterInsertData(err){
        if(err){
            console.log(err)
            return res.send("Erro no cadastro!")
        }

        console.log("Cadastrado com sucesso")
        console.log(this)

        return res.render("create-point.html", { saved: true })
    }

    db.run(query, values, afterInsertData)     

})

server.get("/search", (req, res) => {

    const search = req.query.search

    if(search == ""){
        // pesquisa vazia
        return res.render("search-results.html", {total: 0})
    }

    /* Pegando os dados do Banco de Dados */
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows){
        if(err){
            return console.log(err)
        }

        const total = rows.length

        // mostrar a página html com os dados do banco de dados
        return res.render("search-results.html", {places: rows, total: total})
    })
    // o parâmetro rows contém todos os registros do nosso db

})

// Uma das coisas que podemos fazer <Ref 1> é ligar o servidor:
server.listen(3000)
// ligamos o servidor e especificamos que a sua porta de acesso será a 3000
