<template>
  <main class="main-column">
    <h1>Quem somos?</h1>
    <p>
      A Vintage Store é uma loja fictícia de roupa masculina criada para servir
      como base para a construção de um site de comércio eletrônico para a
      disciplina de Introdução ao Desenvolvimento Web (SCC-0219), do ICMC da USP
      São Carlos, no primeiro semestre de 2022.
    </p>
    <div>
      <h3 id="members-title">Membros do Grupo:</h3>
      <ul id="members-list">
        <li>
          <a target="_blank" href="https://www.linkedin.com/in/gdertoni/">
            <img src="@/assets/gabriel-profile.png" />
            <p>
              Gabriel da Cunha Dertoni <br />
              nUSP: 11796382
            </p>
          </a>
        </li>
        <li>
          <a
            target="_blank"
            href="https://www.linkedin.com/in/jo%C3%A3o-victor-sene-ara%C3%BAjo-2b5728229/"
          >
            <img src="@/assets/joao-profile.png" />
            <p>
              João Victor Sene Araújo <br />
              nUSP: 11796382
            </p>
          </a>
        </li>
        <li>
          <a target="_blank" href="https://www.linkedin.com/in/pedroaurgomes/">
            <img src="@/assets/pedro-profile.png" />
            <p>
              Pedro Augusto Ribeiro Gomes <br />
              nUSP: 11819125
            </p>
          </a>
        </li>
      </ul>
    </div>
  </main>
</template>

<style>
#members-list {
  display: flex;
  justify-content: space-around;
  flex-flow: row wrap;
  gap: 4em;
}

#members-title {
  text-align: center;
  padding: 2em;
}

#members-list li a {
  text-decoration: none;
}

#members-list li a:visited {
  color: var(--black);
}

#members-list li a p {
  text-align: center;
}
</style>
