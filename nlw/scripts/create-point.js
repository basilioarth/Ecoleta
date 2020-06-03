
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

    fetch(url)
    .then( res => res.json() )
    .then( cities => {

        for( city of cities) {
            // Percorremos todos os estados e concatenamos para que eles apareçam no html.
            citySelect.innerHTML += `<option value="${city.id}">${city.nome}</option>`
        }

        citySelect.disabled = false
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


// console.log("Hello")
// Tem por funcionalidade escrever no Console do browser o que foi passado como parâmetro.