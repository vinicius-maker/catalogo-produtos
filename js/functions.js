// retorna todos os produtos da marca especeficada
let produtosMarca = fetch(`${uri}?brand=dior`)
produtosMarca.then((resposta) => {
  resposta.json().then((arrayProdutos)=>{
    let marcas = getMarcas(arrayProdutos)
    let tipos = getTipos(arrayProdutos)
    let div = productItem(arrayProdutos)
    document.getElementById("filter-type").innerHTML = tipos;
    document.getElementById("filter-brand").innerHTML = marcas;
    document.getElementById("catalog").innerHTML = div;
  })
})

//IMPRIME O QUE ESTA SENDO DIGITADO NO CAMPO NOME
document.addEventListener('input', () => {
  let teste1 = document.getElementById("filter-name").value;
  console.log(teste1);
})

// captura todos os tipos de produtos e trata para que não venha haver repetidos
function getTipos(arrayProdutos) {
    const tiposRepetidos = arrayProdutos.map((nomeTipo) => nomeTipo.product_type)
    
    const tiposProdutos = tiposRepetidos.filter((el, i) => tiposRepetidos.indexOf(el) === i)
  
    let select = tiposProdutos.map(tipoProduto => {return item = `<option value="${tipoProduto}">${tipoProduto}</option>`;});
  
    return select.join("");
}

// captura todos os preços e ordena do menor ao maior valor (mostra no console e precisa chamar a função)
function getMenorValor(arrayProdutos) {
    const precosProdutos = arrayProdutos.map((menorPreco) =>  parseFloat(menorPreco.price)).sort()
    console.log(precosProdutos);
}
getMenorValor(arrayProdutos);

// verifica o que foi selecionado no select do filtro
function fitro() {
    let filtro = document.getElementById('sort-type').value
    console.log(filtro);
  }
fitro();

// ordena em ordem alfabetica os produtos
function sortByName(arrayProdutos) {
    let teste = arrayProdutos.sort((a, b) => {
        let nameA = a.name.toUpperCase().replace(" ", "");
        let nameB= b.name.toUpperCase().replace(" ", "");
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
      console.log(teste);
  }
sortByName();  

// verifica se o nome digitado existe no array de produtos
document.addEventListener('input', () => {
    var nomeDigitado = document.getElementById("filter-name").value;
    console.log(nomeDigitado);
    let nomesProdutos = arrayProdutos.filter(nomes => nomes.name == nomeDigitado)
    console.log(nomesProdutos); 
})

