const createUser = document.getElementById("createAccount");

const fonte = document.querySelector(".aa");

const as = document.querySelector(".aas");

async function getRepos() {
  const email = document.querySelector(".emaill").value;
  const senha = document.querySelector(".senhaa").value;
  const empresa = document.querySelector(".empresa").value;
  const response = await fetch("http://localhost:3000/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      senha: senha,
      empresa: empresa
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
      getRepos();
    }, 2000);
  }
}

//validando login e senha

function login() {
  if (verificaToken() == false) {
    window.location.href = "userArea.html";
  } else {
    window.location.href = "login.html";
  }
}

function verificaToken() {
  if (localStorage.getItem("token") == null) {
    alert("Você não está logado!");
    window.location.href = "login.html";
  } else {
    return false;
  }
}

function logout() {
  localStorage.removeItem("logado");
  localStorage.removeItem("token");
  window.location.href = "index.html";
}

const email = document.querySelector(".emailUser");
const senha = document.querySelector(".senhaUser");

const form = document.getElementById("form");

function formSet() {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    pegarDados();
  });
}

function pegarDados() {
  let emailTeste = email.value;
  let senhaTeste = senha.value;

  getDados(emailTeste, senhaTeste);
}

var logado = {
  email: "",
  senha: "",
};

async function getDados(email, senhaa) {
  const erro = document.querySelector(".erro");

  const response = await fetch("http://localhost:3000/users");

  if (!response.ok) {
    throw new Error("Erro ao obter os dados do usuário");
  }

  const data = await response.json();

  let loggedIn = false;

  data.forEach((user) => {
    if (user.email === email && user.senha === senhaa) {
      loggedIn = true;

      logado = {
        email: user.email,
        senha: user.senha,
      };

      localStorage.setItem("logado", JSON.stringify(logado));

      let token = Math.random().toString(36).substr(2);
      localStorage.setItem("token", token);
    }
  });

  if (loggedIn) {
    setTimeout(() => {
      window.location.href = "index.html";
    }, 2000);
  } else {
    erro.innerHTML = "Usuário ou senha inválidos";
  }
}

function getLogado() {
  if (location.pathname !== "/login.html") {
    let usuario = document.querySelectorAll(".usuario");
    let userLogado = JSON.parse(localStorage.getItem("logado"));
    usuario.forEach((user) => {
      user.innerHTML = `${userLogado.email}`;
    });
    
  }

  if (location.pathname == "/userArea.html") {
    verificaToken();
  }
}

getLogado();


