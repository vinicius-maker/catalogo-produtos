const uri = 'http://makeup-api.herokuapp.com/api/v1/products.json';
const uribackend = 'http://localhost:3000/posts';

// retorna todos os produtos
let produtosPromise = fetch(`${uribackend}`);
produtosPromise.then((resposta) => {
  resposta.json().then((arrayProdutos)=>{
    getMarcas(arrayProdutos)
    getTipos(arrayProdutos)
    let div = productItem(arrayProdutos)
    document.getElementById("catalog").innerHTML = div;
  })
})

// captura todas as marcas e trata para que não venha haver repetidas
function getMarcas(arrayProdutos) {
  const marcasRepetidas = arrayProdutos.map((nomeMarca) => nomeMarca.brand)
  
  const marcas = marcasRepetidas.filter((el, i) => marcasRepetidas.indexOf(el) === i)

  const select = marcas.map(marca => {return item = `<option value="${marca}">${marca}</option>`;});
  
  document.getElementById("filter-brand").innerHTML = select;

  return select.join("");
}

// captura todos os tipos de produtos e trata para que não venha haver repetidos
function getTipos(arrayProdutos) {
  const tiposRepetidos = arrayProdutos.map((nomeTipo) => nomeTipo.product_type)
  
  const tiposProdutos = tiposRepetidos.filter((el, i) => tiposRepetidos.indexOf(el) === i)

  let select = tiposProdutos.map(tipoProduto => {return item = `<option value="${tipoProduto}">${tipoProduto}</option>`;});

  document.getElementById("filter-type").innerHTML = select;

  //return select.join("");
}

// captura todos os preços e ordena do menor ao maior valor (mostra no console e precisa chamar a função)
function getMenorValor(arrayProdutos) {
  const precosProdutos = arrayProdutos.map((menorPreco) =>  parseFloat(menorPreco.price)).sort()
  console.log(precosProdutos);
}

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

// mostra os produtos no html
function productItem(arrayProdutos) {
let rows = arrayProdutos.map(arrayProduto => {
  return item = `<div class="product" data-name=${arrayProduto.name} data-brand=${arrayProduto.brand} data-type=${arrayProduto.product_type} tabindex=${arrayProduto.id}>
  <figure class="product-figure">
    <img src=${arrayProduto.image_link} width="215" height="215" alt=${arrayProduto.name} onerror="javascript:this.src='img/unavailable.png'">
  </figure>
  <section class="product-description">
    <h1 class="product-name">${arrayProduto.name}</h1>
    <div class="product-brands"><span class="product-brand background-brand">${arrayProduto.brand}</span>
<span class="product-brand background-price">R$ ${(arrayProduto.price * 5.50).toFixed(2).replace('.', ',')}</span></div>
  </section>
  ${loadDetails(arrayProduto)}
</div>`;;
});
return rows.join("");
}

// mostra os detalhes dos produtos no html
function loadDetails(product) {
    return details = `<section class="product-details"><div class="details-row">
        <div>Brand</div>
        <div class="details-bar">
          <div class="details-bar-bg" style="width= 250">${product.brand}</div>
        </div>
      </div><div class="details-row">
        <div>Price</div>
        <div class="details-bar">
          <div class="details-bar-bg" style="width= 250">${(product.price * 5.50).toFixed(2).replace('.', ',')}</div>
        </div>
      </div><div class="details-row">
        <div>Rating</div>
        <div class="details-bar">
          <div class="details-bar-bg" style="width= 250">${product.rating == null ? 0 : product.rating}</div>
        </div>
      </div><div class="details-row">
        <div>Category</div>
        <div class="details-bar">
          <div class="details-bar-bg" style="width= 250">${product.category == null ? "" : product.category}</div>
        </div>
      </div><div class="details-row">
        <div>Product_type</div>
        <div class="details-bar">
          <div class="details-bar-bg" style="width= 250">${product.product_type}</div>
        </div>
      </div></section>`;
}

