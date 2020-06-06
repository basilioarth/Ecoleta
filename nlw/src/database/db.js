/*======================================================== Importando a dependência do sqlite3 ========================================================*/

const sqlite3 = require("sqlite3").verbose()
// o método verbose informa ao sqlite para que recebamos mais mensagens informativas no nosso terminal

/*=============================================== Criando o objeto que irá fazer operações no banco de dados ==========================================*/

const db = new sqlite3.Database("./src/database/database.db")
// estamos passando como parâmetro do constructor o caminho onde queremos que ele crie o database.db (o nosso banco de dados)

module.exports = db
// exportando o arquivo db para ser utilizado em outros lugares

/*========================================== Utilizando o objeto de banco de dados para as nossas operações ===========================================*/

// db.serialize(() => {
//     /* Criando uma tabela no db com comandos SQL */
//     db.run(`
//         CREATE TABLE IF NOT EXISTS places (
//             id INTEGER PRIMARY KEY AUTOINCREMENT,
//             image TEXT,
//             name TEXT, 
//             address TEXT,
//             address2 TEXT,
//             state TEXT,
//             city TEXT,
//             items TEXT
//         );
//     `)
//     // utilizar a crase nos permite dar uma quebra de linha no nosso código sem gerar problemas

//     /* Inserindo dados na tabela com comandos SQL */
//     const query = 
//     `INSERT INTO places (
//         image,
//         name,
//         address,
//         address2,
//         state,
//         city,
//         items
//     ) VALUES (?,?,?,?,?,?,?);`
//     // Ao colocarmos ? nos values podemos posteriormente trocar essas interrogações por outros valores.
//     // Possibilitamos uma maneira dinâmica de trocar esses valores

//     const values = [
//         "https://images.unsplash.com/photo-1567393528677-d6adae7d4a0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
//         "Papersider",
//         "Guilherme Gemballa, Jardim América",
//         "Número 260",
//         "Santa Catarina",
//         "Rio do Sul",
//         "Resíduos Eletrônicos, Lâmpadas"
//     ]
//     // As ? presentes na variável query serão substituidas pelos valores presentes na variável values

//     function afterInsertData(err){
//         if(err){
//             return console.log(err)
//         }

//         console.log("Cadastrado com sucesso")
//         console.log(this)
//         // o this, dentro dessa função, referencia a resposta que o bd está trazendo
//     }

//     db.run(query, values, afterInsertData) 
//     // O tercerio parâmetro é uma função do tipo callback. Funções assim permitem que o restante do código 
//     // execute enquanto esperamos a resposta de algo. No nosso caso, a resposta do banco de dados.
//     // Isso é útil, pois buscar algo no banco pode ser algo demorado e a nossa aplicação não pode parar.
//     // Quando o bd trouxer a sua resposta, chamamos novamente a função que está entre parênteses e agora ela é executada.

//     /* Consultando os dados da tabela com comandos SQL */
//     db.all(`SELECT * FROM places`, function(err, rows){
//         if(err){
//             return console.log(err)
//         }

//         console.log("Aqui estão seus registros: ")
//         console.log(rows)
//     })
//     // o parâmetro rows contém todos os registros do nosso db

//    /* Deletando um dado da tabela com comandos SQL */
//    db.run(`DELETE FROM places WHERE id = ?`, [3], function(err){
//        if(err){
//            return console.log(err)
//      }
        
//        console.log("Registro deletado com sucesso!")
//    })

// })
// o método serialize serve para o db executar uma sequência de códigos.
// essa sequência de códigos deve estar dentro da função passada como parâmetro do serialize