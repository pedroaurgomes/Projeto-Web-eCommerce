# Projeto-Web-eCommerce: Vintage Store

![logo vintage store](/extra/logovintage.png "vintage logo")

Trabalho desenvolvido para a disciplina de Introdução ao Desenvolvimento Web (SCC-0219), no primeiro semestre  de 2022, no ICMC -USP

AVISO: Esse é um projeto realizado para fins educativos e tem problemas graves de segurança.

## Grupo
 * [Gabriel da Cunha Dertoni](https://github.com/GabrielDertoni) - nUSP: 11795717
 * [João Victor Sene Araújo](https://github.com/JoaoVSene) - nUSP: 11796382
 * [Pedro Augusto Ribeiro Gomes](https://github.com/pedroaurgomes) - nUSP: 11819125

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

Acompanhamento de pedidos: tanto os clientes quanto os administradores poderão acompanhar os pedidos feitos. Os admins conseguem ver todos os pedidos 
feitos por todos os clientes e verificar: a data do pedido, os itens pedidos, o valor total do pedido e o status atual do pedido. Os clientes, por sua
vez, têm acesso às mesmas informações, porém estão restritos a visualizar apenas os pedidos feitos na conta em que estão logados.

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

#### Testando o fluxo de usuário cliente

1. Abra o site na página principal
2. Selecione um produto qualquer
3. Na página de descrição de produto, selecione a cor e quantidade desejada
4. Clique em 'comprar', o site irá para a página de carrinho
5. Volte para a página inicial clicando na logo do site na barra do topo
6. Volte para a etapa 2 até que tenha produtos suficientes no carrinho
7. Navegue até a página de carrinho através do botão "carrinho" na barra do topo
8. Insira o CEP desejado, pressione o botão "calcular". O valor do frete aparecerá em sua seção designada.
9. Selecione o cartão desejado e insira os dados de cartão (podem ser quaisquer números).
10. Pressione "Finalizar" para finalizar a compra. O usuário será notificado de que precisa estar logado para realizar a operação e será redirecionado para a página de login.
11. Para cadastrar uma nova conta, na página de login, pressione "Cadastrar-se agora". Um modal deve aparecer onde as informações de cadastro podem ser inseridas.
12. Pressione "Cadastrar". O usuário será redirecionado novamente para a página de carrinho para poder finalizar a compra.
13. Insira novamente os dados de cep e cartão e pressione "Finalizar". Um popup aparecerá indicando que a operação foi bem sucedida.

#### Verificando e alternado informações de conta

1. É possível verificar as opções da conta através da página "Minha Conta" que pode ser acessada através do botão na top bar que está disponível somente para usuários logados como cliente.
2. Na página de "Minha Conta", modifique algum dado e pressione "Salvar". Os dados serão modificados e o usuário poderá recarregar a página a vontade sem que os dados se alterem.
3. Para finalizar a interação, pressione "Sair". O usuário será redirecionado para a página inicial.

#### Testando permissões para usuário cliente

1. O usuário cliente não possui acesso às páginas de admin. Dessa forma, qualquer tentativa de acessar uma página de admin, como por exemplo a rota "/admin/users", resultará numa mensagem de erro e a navegação será cancelada.

#### Fazendo login como administrador

1. Abra a página de "Login" através da barra do topo.
2. Utilize nome de usuário e senha "admin" para acessar a conta de administrador. O usuário será redirecionado para a página de "Minha conta".

#### Editando produtos

1. Abra a página de "Produtos" na barra do topo. Lá, é possível remover, editar e adicionar produtos.
2. Para adicionar um novo produto, clique em "Novo Produto" no fim da página. Um formulário de produto será aberto.
3. Selecione uma imagem e preencha os outros dados do formulário. Por fim, pressione "Salvar". O usuário será redirecionado de volta para a página de produtos, onde o novo produtos deverá aparecer listado. Vale notar que a imagem do produto se tornará inválida caso a página seja recarrecada, diferentemente dos outros dados que são persistentes no `localStorage`.
4. Para editar um produto, pressione o icone com o lápis. O mesmo formulário de produto será aberto, mas com os dados já preenchidos de acordo com o produto selecionado. Altere os dados desejados. Clique em "Salvar". O usuário será redirecionado novamente para a página de "Produtos" e poderá ver suas alterações.

#### Editando usuários

1. Acesse a página de "Usuários" através da barra de topo.
2. Através dessa página é possível remover usuários ou editar seus papéis. Clique no botão com o ícone de lápis para editar o papel de um usuário. Altere o papel de um usuário de cliente para admin. Clique em "Salvar". O papel desse usuário foi modificado e, caso seja feito o login com ele, ele terá visão de admin.
9. Remova um usuário clicando no botão de "X". O site pedirá confirmação ao administrador. Caso seja confirmado, o usuário será deletado. Essa mudança persiste através de reloads da página.

#### Testando permissões de acesso

1. Administradores não possuem permissão para acessar a página de carrinho. Para testar isso, navegue até a página inicial e selecione um produto qualquer. Na página de descrição de produto, o botão de "Comprar" estará desativado. Além disso, qualquer tentativa de acessar a rota "/cart" diretamente resultará numa mensagem de erro.

### 5. Resultados dos testes

Todos os testes obtiveram os resultados esperados.

### 6. Compilando e rodando

Para visualizar os mockups html entregues na **Milestone 1**, acessar a pasta html e rodar um servidor local simples, por exemplo:

```bash
cd html
python3 -m http.server
```

Para testar o site clientside entregues na **Milestone 2**, acessar a pasta `vintage-store-client` e rodar os seguintes comandos:

```bash
npm install
npm run dev
```

Em outro terminal, entre na pasta `vintage-store-server`.

Para rodar o backend é necessário ter o MongoDB instalado e com um banco de
dados "test" que possa ser utilizado pela aplicação.

Caso o docker esteja instalado, basta executar

```bash
docker run --rm --name mongo -p 27017:27017 -d mongo
```

Inicie o backend através de

```bash
npm instal
node main.js
```

Caso seja a primeira vez iniciando o banco de dados, os dados iniciais ainda não
estarão populados. Para popular o banco com os dados iniciais, abra o site do
frontend e acesse o console. Nele execute o seguinte comando:

```javascript
fetch("http://localhost:8080/api/populate_products", { method: "POST" });
```

Recarregue a página.

Em seguida, acesse [http://localhost:8000](http://localhost:3000) para ver as páginas.

### 7. Problemas

Sem problemas.

### 8. Comentários

Os mockups iniciais incluiam as seguintes páginas que foram removidas da implementação:
- Página de pedidos (cliente)
- Página de pedidos (admin)
- Página de checkout (agora está integrada com a página de carrinho)
- Página de cadastro (agora é um modal em cima da página de login)
 
## Links

 * [Mockups no Figma](https://www.figma.com/file/pkmbaQasRYcu4X9yN1edqh/Web?node-id=0%3A1)
