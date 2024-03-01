const createUser = document.getElementById("createAccount");
const fonte = document.querySelector(".aa");

createUser.addEventListener("click", () => {
  validarSenha();
  
});

async function getRepos() {
    
  const email = document.querySelector(".emaill").value;
  const senha = document.querySelector(".senhaa").value;
  const response = await fetch("http://localhost:3000/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      senha: senha,
    }),
  });
}

const senha1 = document.querySelector(".senha1");
const senha2 = document.querySelector(".senha2");

function validarSenha() {
  if (senha1.value != senha2.value) {
    alert("Senhas diferentes!");
  } else {
    fonte.innerHTML = "Criando usuário...";

    setTimeout(() => {
      fonte.innerHTML = `Usuário criado com sucesso!  <i class="bi bi-check-circle-fill"></i>`;
      getRepos()
    }, 2000);
    
    
  }
}
