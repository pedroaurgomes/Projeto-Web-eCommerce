<template>
  <footer class="main-column">
    <div>
      <h3>Contato:</h3>
      <ul>
        <li><a href="">Instagram</a></li>
        <li><a href="">Facebook</a></li>
        <li><a href="">ajuda@vintage.com</a></li>
      </ul>
    </div>
    <div>
      <h3>Formas de pagamento:</h3>
      <ul>
        <li>Cartão de crédito</li>
      </ul>
    </div>
    <div>
      <h3>Endereço:</h3>
      <ul>
        <li>
          Rua Alguma Coisa, algum número - Bairro. Qualquer. Cidade - Estado
          CEP: xx xxx xxx
        </li>
      </ul>
    </div>
  </footer>
</template>

<script>
export default {
  setup() {},
};
</script>

<style>
footer {
  width: 100%;
  background-color: var(--black);
  box-sizing: border-box;
  display: grid;
  padding-top: 2em;
  padding-bottom: 2em;
  grid-template-columns: repeat(3, 1fr);
  color: var(--white);
}

footer h3 {
  margin-bottom: 0;
}

footer ul {
  margin-top: 0.5em;
}

footer a {
  color: var(--white);
}
</style>
