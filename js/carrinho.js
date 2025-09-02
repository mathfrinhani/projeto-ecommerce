/*
Objetivo 1 - quando clicar no botão de adicionar ao carrinho:
    - 1.1 atualizar o contador
        - 1.1.1 pegar os botões de adicionar ao carrinho do html
        - 1.1.2 adicionar evento de escuta ao clicar nos botões
        - 1.1.3 pega as informações do produto clicado e adicionar no localStorage;
    - 1.2 adicionar o produto no localStorage
    - 1.3 atualizar a tabela HTML do carrinho

Objetivo 2 - remover produtos do carrinho:
    - 2.1 ouvir o botão de deletar
    - 2.2 remover do localStorage
    - 2.3 atualizar o DOM e o total

Objetivo 3 - atualizar valores do carrinho:
    - 3.1 ouvir mudanças de quantidade
    - 3.2 recalcular total individual
    - 3.3 recalcular total geral
*/

// Objetivo 1 - quando clicar no botão de adicionar ao carrinho:
//1.1 atualizar o contador
//1.1.1 pegar os botões de adicionar ao carrinho do html
const botoesAdicionarAoCarrinho = document.querySelectorAll('.adicionar-ao-carrinho');

//1.1.2 adicionar evento de escuta ao clicar nos botões
botoesAdicionarAoCarrinho.forEach(botao => {
    botao.addEventListener('click', (evento) => {
        // 1.1.3 pega as informações do produto clicado e adicionar no localStorage;
        const elementoProduto = evento.target.closest(".produto");
        const produtoId = elementoProduto.dataset.id;
        const produtoNome = elementoProduto.querySelector(".nome").textContent;
        const produtoImagem = elementoProduto.querySelector("img").getAttribute("src");
        const produtoPreco = parseFloat(elementoProduto.querySelector(".preco").textContent.replace("R$", "").replace(".", "").replace(",", "."));

        //buscar a lista de produtos do local storage

        const carrinho = obterProdutosDoCarrinho();

        //testar se o produto já existe no carrinho

        const existeProduto = carrinho.find(produto => produto.id === produtoId);
        if (existeProduto) {
            existeProduto.quantidade += 1;
        } else {
            //se não existe adicionar o produto com quantidade 1
            const produto = {
                id: produtoId,
                nome: produtoNome,
                imagem: produtoImagem,
                preco: produtoPreco,
                quantidade: 1
            };
            carrinho.push(produto);
        };
        salvarProdutosNoCarrinho(carrinho);
        atualizarContadorCarrinho();
    });
});

function salvarProdutosNoCarrinho(carrinho) {
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

function obterProdutosDoCarrinho() {
    const produtos = localStorage.getItem("carrinho");
    return produtos ? JSON.parse(produtos) : [];
}

// 1.1.4 atualizar o contador do carrinho de compras
function atualizarContadorCarrinho() {
    const carrinho = obterProdutosDoCarrinho();
    let total = 0;

    carrinho.forEach(produto => {
        total += produto.quantidade;
    });

    document.getElementById("contador-carrinho").textContent = total;
}

atualizarContadorCarrinho();