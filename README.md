# Projeto-Web-eCommerce: Vintage Store

![logo vintage store](/extra/logovintage.png "vintage logo")

Trabalho desenvolvido para a disciplina de Introdução ao Desenvolvimento Web (SCC-0219), no primeiro semestre  de 2022, no ICMC -USP

AVISO: Esse é um projeto realizado para fins educativos e tem problemas graves de segurança.

## Project Report

### Tabela de conteúdos

1. [Requisitos](#1-requisitos)
2. [Descrição do Projeto](#2-descrição-do-projeto)
3. [Comentários sobre o código](#3-comentários-sobre-o-código)
4. [Plano de teste](#4-plano-de-teste)
5. [Resultados dos testes](#5-resultados-dos-testes)
6. [Building](#6-building)
7. [Problemas](#7-problemas)
8. [Comentários](#8-comentários)


### 1. Requisitos
O sistema possuirá dois tipos de usuários: clientes e administradores.

Teremos telas comuns para qualquer usuário, mesmo que não esteja logado,telas específicas para clientes e outras específicas para administradores.
(o diagrama com as telas e os mock-ups pode ser visto no item [2. Descrição do Projeto](#2-descrição-do-projeto) ).

Os administradores são os reponsáveis por gerenciar os clientes, produtos e os outros administradores do site.
  Obs: A aplicação já vem com uma conta padrão de administrador. Login: admin, Senha: admin.

Os registros dos produtos incluem nome, id (gerado automaticamente), foto, descrição, preço, quantidade em estoque e quantidade vendida.

Gerenciamento de produtos: os administradores contarão com uma lista de todos os produtos da loja, a partir da qual poderão visualizar e editar todos
os seus atributos.

O registro de usuários incluirá: nome, CPF, número de telefone, email, endereço e cargo (admin ou cliente).

Gerenciamento de usuários: os administradores contarão com uma lista de usuários a partir da qual poderão visualizar o nome dos usuários do site, bem 
como modificar seu cargo.

Venda de produtos: um usuário qualquer entra no site e tem acesso direto à página home, que corresponde ao catálogo de produtos. O usuário pode 
selecionar um produto, ou usar a barra de buscar para fazer uma pesquisa específica, personalizada, (ver funcionalidade específica, abaixo) de acordo
o nome ou marca do(s) produto(s) desejado(s). Ao encontrar um produto que deseja comprar, o usuário clica sobre a foto do produto e é direcionado à 
página específica daquele produto, onde contará com fotos, uma descrição do produto, o nome do produto e sua marca. Além disso, é nessa página que o
cliente poderá selecionar o tamanho da peça de roupa que lhe convém, bem como a quantidade que deseja comprar. Assim, basta adicionar o produto ao 
carrinho.
Com todos os produtos desejados já adicionados no carrinho, o cliente poderá calcular o frete e o prazo de entrega do produto - colocando seu cep no 
campo específico - e poderá clicar no botão "finalizar" para ser direcionado à página que corresponde à etapa final da compra, onde o cliente definirá 
o método de pagamento (débito ou crédito), colocará os dados do cartão, confirmará os produtos conprados e o valor total da compra e poderá concluir o
pedido.
É importante ressaltar que, se o cliente clicar sobre o botão de finalizar compra sem estar logado, ele será direcionado à página de login antes de 
completar a operação.
Após o cliente finalizar a compra, o número de produtos envolvidos na operação é subtraído do estoque e adicionado aos vendidos e o carrinho do cliente 
é esvaziado.

Funcionalidade específica: o sistema contará com um filtro personalizado de buscas na página de catálogo de produtos. O cliente poderá selecionar uma
ou mais palavras-chave relacionadas à marca ou ao tipo da peça de roupa que ele está procurando e o sistema se encarregará de filtrar a consulta 
requisitada pelo usuário. Por exemplo, o cliente pode estar querendo comprar calças que sejam da Nike ou da Adidas, para isso, ele poderá digitar as
palavras-chave: "Nike", "Adidas" e "Calça", para visualizar somente as peças de roupa que atendam esses requisitos.

### 2. Descrição do Projeto
A vintage Store é uma loja virtual fictícia de roupa masculina utilizada como base para a construção de um site de e-commerce para a disciplina de
Introdução ao Desenvolvimento Web.


#### Diagrama de navegação:

![diagrama de navegação](/extra/diagrama.png "diagrama")

Verifique os mock-ups de todas as páginas na pasta "mockup", ou através dos links abaixo:

* [Home page / Catálogo](mockup/Home_Catalogo.png)
* [Sobre nós](mockup/Sobre.png)
* [Descrição do produto](mockup/DescricaoProduto.png)
* [Carrinho](mockup/Carrinho.png)
* [Login](mockup/Login.png)
* [Cadastro](mockup/Cadastro.png)
* [Lista de pedidos (admin)](mockup/PedidosAdmin.png)
* [Gerenciamento de usuários](mockup/GerenciamentoUsuarios.png)
* [Lista de Produtos](mockup/ListaProdudtos.png)
* [Formulário para edição de produtos](mockup/FormularioProduto.png)
* [Finalizar Compra (checkout)](mockup/FinalizarCompra.png)
* [Minha conta](mockup/Minhaconta.png)
* [Meus pedidos (cliente)](mockup/Pedidos.png)


### 3. Comentários sobre o código

### 4. Plano de teste

### 5. Resultados dos testes

### 6. Building

### 7. Problemas

### 8. Comentários

## Grupo
 * [Gabriel da Cunha Dertoni](https://github.com/GabrielDertoni) - nUSP: 11795717
 * [João Victor Sene Araújo](https://github.com/JoaoVSene) - nUSP: 11796382
 * [Pedro Augusto Ribeiro Gomes](https://github.com/pedroaurgomes) - nUSP: 11819125
