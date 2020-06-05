// console.log("Hello")
// Tem por funcionalidade escrever no Console do browser o que foi passado como parâmetro.

/*======================================== IMPLEMENTANDO O PREENCHIMENTO DA LISTA DE ESTADOS E DA LISTA DE CIDADES =======================================*/


function populeUFS() {
    const ufSelect = document.querySelector("select[name=uf")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    // Busca a lista de estados
    .then( res => res.json() )
    // Transforma a lista de estados em um json
    .then( states => {

        for( state of states) {
            // Percorremos todos os estados e concatenamos para que eles apareçam no html.
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }

    })
}

populeUFS()

function getCities(event) {
// Por estarmos passando a função por referência, conseguimos facilmente capturar o evento com a qual ela está envolvida.
    const citySelect = document.querySelector("select[name=city")
    const stateInput = document.querySelector("input[name=state")

    const ufValue = event.target.value
    // o .target do event informa aonde o evento foi executado. No caso o evento foi executado no select[name=uf]

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text


    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a Cidade</option>" 
    // Estamos limpando a lista das cidades para que só coloquemos ali as cidades daquele estado atual
    citySelect.disabled = true

    fetch(url)
    .then( res => res.json() )
    .then( cities => {
        
        for( city of cities) {
            // Percorremos todos os estados e concatenamos para que eles apareçam no html.
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }

        citySelect.disabled = false
        // Após preenchermos a lista com todos os estados, tornamos o campo visível.
    })

}

document
   .querySelector("select[name=uf]") // Estou selecioando no meu documento html a tag select cujo name = uf
    .addEventListener("change", getCities) 
    /* Obs: Não colocamos os parênteses, pois assim a função executaria imediatamanete. Não é isso que queremos; queremos
        que, quando mudar de estado, só assim a função seja executada. */
    // Estamos adicionando um método que "ouve" qualquer evento que aconteça. No caso, estamos especificando que queremos 
    // perceber um eveto do tipo change. O segundo parâmetro desse método é uma função. No caso, se trata de uma função
    // anônima.


/*================================================= IMPLEMENTANDO A SELEÇÃO DE OPÇÕES DO ÍTENS DE COLETA =================================================*/

const itemsToCollect = document.querySelectorAll(".items-grid li")
// Estamos colocando todos os li presentes em .items-grid do nosso documento html

for (item of itemsToCollect){
    item.addEventListener("click", handleSelectedItem)
    // Estamos a todo momento "ouvindo" se há um click em algum dos itens. Para cada um dos cliques chamamos a função handleSelectedItem
}

const collectedItems = document.querySelector("input[name=items]")

let selectedItems = [] 

function handleSelectedItem(event){
    // Por parâmetro tem o evento ocorrido

    const itemLi = event.target

    // adicionar ou remover uma classe com javascript
    itemLi.classList.toggle("selected")
    // o toggle adiciona ou remove a classe selected. Para fazer isso, ele olha o elemento li e verifica se na lista de 
    // classes deles existe a classe selected. Caso tenha, ele remove. Caso contrário, ele adiciona.

    const itemId = itemLi.dataset.id

    // Verifica se há itens selecionados, se sim, coleta esse itens selecionados 
    const alreadySelected = selectedItems.findIndex( item => {
        return  item == itemId
    })
    // o método .findIndex é interativo. Isso significa que ele vai pegar de um por um todos os elementos do array selectedItems. Para cada item que o 
    // findIndex pegar ele vai executar a função function. Por isso que conseguimos passar o item atual como parâmetro da arrowFunction

    // Se já estiver selecionado (alreadySelected recebe -1 quando o id do evento não coincide com nenhum dos item selecionados)
    if(alreadySelected >= 0) {
        //tirar da seleção
        const filteredItems = selectedItems.filter( item => {
            // filteredItems recebe o array selectedItems filtrado, ou seja, com alguns elementos a menos. O método .filter filtra o array (retira o 
            // elemento atual de dentro do array) quando o retorno da função passada por parâmetro for true. O método retorna o elemento filtrado/retirado.
            return item != itemId
            // quando os itens forem diferentes ele vai adicionar o "item" na nova lista filteredItems
        })

        selectedItems = filteredItems
        // estamos atualizando a lista de itens selecionados. Somente aqueles itens que não foram desmarcados é que estarão na lista
    } else {
        // Se não estiver selecionado ainda, selecionar agora e colocar à lista de itens selecionados
        selectedItems.push(itemId) 
    }

    //console.log(selectedItems)

// Para podermos enviar essa informação através da subimissão do meu relatório, eu preciso passar isso para o mesmo. Para isso, alteraremos o campo escondido
// com os itens selecionados
    collectedItems.value = selectedItems
    
}