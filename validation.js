let change = document.querySelectorAll(".change");

change[0].addEventListener("click", () => {
  show();
});
change[1].addEventListener("click", () => {
  change[1].parentElement.style.display = "none";
  change[0].parentElement.style.display = "block";
});

let register_form = document.getElementById("register");
let register_inputs = document.querySelectorAll("#register input");
let login_form = document.getElementById("login");
let login_inputs = document.querySelectorAll("#login input");

register_form.addEventListener("submit", async (e) => {
  e.preventDefault();
  createUser(register_inputs[0].value, register_inputs[1].value);
  show();
  register_inputs.forEach((input) => {
    input.value = "";
  });
});

login_form.addEventListener("submit", async (e) => {
  e.preventDefault();

  login(login_inputs[0].value, login_inputs[1].value).then((res) => {
    localStorage.setItem("token", res.token);
    let token = localStorage.getItem("token");
    console.log(res);
  });
  login_inputs.forEach((input) => {
    input.value = "";
  });
});

// Functions
function show() {
  change[0].parentElement.style.display = "none";
  change[1].parentElement.style.display = "block";
}

async function createUser(username, password) {
  let request = await fetch("http://localhost:8080/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });
}

async function login(username, password) {
  let request = await fetch("http://localhost:8080/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });
  return request.json();
}
