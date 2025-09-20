// Toggle Languages
let language = localStorage.getItem("lang");
// console.log(language)

if (language === null){
    localStorage.setItem("lang", "en");
    location.reload();
}

else if (language === "en"){
    // Change Direction
    document.getElementsByTagName("html")[0].setAttribute("lang", "en")
    // Switch Language
    let containerAr = document.getElementsByClassName("container-ar");
    containerAr[0].remove();
}

else if (language === "ar"){
    // Change Direction
    document.getElementsByTagName("html")[0].setAttribute("lang", "ar");
    document.getElementsByTagName("html")[0].setAttribute("dir", "rtl");
    // Switch Language
    let containerEn = document.getElementsByClassName("container-en");
    containerEn[0].remove();
}

function switchLanguage(lang){
    if (lang===1) localStorage.setItem("lang", "en");
    else localStorage.setItem("lang", "ar");
    location.reload();
}

// Todo Scripts
// Account class
class Account 
{
  constructor(name, usr, passwd) {
    this.name = name;
    this.usr = usr;
    this.passwd = passwd;
    this.tasks = [];
  }
}

// Task Class
class Task 
{
  constructor(text) {
    this.id = Date.now();
    this.text = text;
  }
}

// getAccounts from LocalStorage
function getAccounts() {
  let accounts = localStorage.getItem("accounts");
  if (accounts) {
    return JSON.parse(accounts);
  }
  return [];
}

// saveAccounts to LocalStorage
function saveAccounts(accounts) {
  localStorage.setItem("accounts", JSON.stringify(accounts));
}

// Save current logged-in user
function setCurrentUser(usrname) {
  localStorage.setItem("currentUser", usrname);
}

function getCurrentUser() {
  return localStorage.getItem("currentUser");
}

function clearCurrentUser() {
  localStorage.removeItem("currentUser");
}

// Register
function register() {
  const name = document.getElementById("txt_name").value;
  const usrname = document.getElementById("txt_username").value;
  const passwd = document.getElementById("txt_password1").value;
  const passwd2 = document.getElementById("txt_password2").value;

  if (passwd !== passwd2) {
    if (language === "en") document.getElementById("message-en").innerText = "Password Doesn't Match.";
    else document.getElementById("message-ar").innerText = "كلمة السر لا تتفق.";
    return;
  }

  if (name && usrname && passwd === passwd2) {
    let accounts = getAccounts();

    if (accounts.some(acc => acc.usr === usrname)) {
      if (language === "en") document.getElementById("message-en").innerText = "Username exists.";
      else document.getElementById("message-ar").innerText = "اسم المستخدم موجود من قبل.";
      return;
    }

    const newAccount = new Account(name, usrname, passwd);
    accounts.push(newAccount);
    saveAccounts(accounts);

    if (language === "en") document.getElementById("message-en").innerText = "Registered successfully.";
    else document.getElementById("message-ar").innerText = "تم التسجيل بنجاح.";
    setTimeout(() => {
      window.location.href = "todos.html";
    }, 1500);
  } else {
    if (language === "en") document.getElementById("message-en").innerText = "Please enter all fields.";
    else document.getElementById("message-ar").innerText = "برجاء ادخال جميع البيانات.";
  }
}

// Login
function login() {
  const username = document.getElementById("txt_username").value;
  const password = document.getElementById("txt_password").value;

  let accounts = getAccounts();
  let account = accounts.find(acc => acc.usr === username && acc.passwd === password);

  // console.log(account);

  if (account) {
    setCurrentUser(username);
    window.location.href = "todos.html";
  } else {
    if (language === "en") document.getElementById("message-en").innerText = "Wrong username or password.";
    else document.getElementById("message-ar").innerText = "خطأ اسم المستخدم/كلمة السر";
  }
}

// Add Task
function addTask() {
  const taskText = document.getElementById("taskInput").value;
  if (!taskText) return;

  let accounts = getAccounts();
  let username = getCurrentUser();
  let account = accounts.find(acc => acc.usr === username);

  const newTask = new Task(taskText);
  account.tasks.push(newTask);

  saveAccounts(accounts);
  document.getElementById("taskInput").value = "";
  renderTasks();
}

// Delete Task
function deleteTask(taskId) {
  let accounts = getAccounts();
  let username = getCurrentUser();
  let account = accounts.find(acc => acc.usr === username);

  account.tasks = account.tasks.filter(task => task.id !== taskId);

  saveAccounts(accounts);
  renderTasks();
}

// Render Tasks
function renderTasks() {
  if (!document.getElementById("taskList")) return;

  let accounts = getAccounts();
  let username = getCurrentUser();
  if (!username) {
    window.location.href = "index.html";
    return;
  }

  let account = accounts.find(acc => acc.usr === username);

  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  account.tasks.forEach(task => {
    let li = document.createElement("li");
    li.textContent = task.text;

    let delBtn = document.createElement("button");
    delBtn.textContent = "⛔";
    delBtn.onclick = () => deleteTask(task.id);

    li.appendChild(delBtn);
    taskList.appendChild(li);
  });
}

// Auto-run if on todos.html
document.addEventListener("DOMContentLoaded", () => {
  if (window.location.pathname.endsWith("todos.html")) {
    renderTasks();
  }
});

// Logout
function logout() {
  clearCurrentUser();
  window.location.href = "index.html";
}

// EventListeners

// Lang Buttons
const btnLangEn = document.querySelector("#btn_lang_en");
btnLangEn.addEventListener("click", () => switchLanguage(1));
const btnLangAr = document.querySelector("#btn_lang_ar");
btnLangAr.addEventListener("click", () => switchLanguage(2));

// index.html: login submit button
// const btnLoginEn = document.querySelector("#btn_login_en");
// btnLoginEn.addEventListener("click", () => login());
// document.addEventListener("DOMContentLoaded", function() {
//   const btnLoginEn = document.querySelector("#btn_login_en");
//   btnLoginEn.addEventListener("click", login);
// });

// const btnLoginAr = document.querySelector("#btn_login_ar");
// btnLoginAr.addEventListener("click", () => login());
// document.addEventListener("DOMContentLoaded", function() {
//   const btnLoginAr = document.querySelector("#btn_login_ar");
//   btnLoginAr.addEventListener("click", login);
// });

document.addEventListener("DOMContentLoaded", function() {
  const btnLogin = document.querySelector("#btn_login");
  btnLogin.addEventListener("click", login);
});

// registration.html: register button
// document.addEventListener("DOMContentLoaded", function() {
//   const btnRegEn = document.querySelector("#btn_register_en");
//   btnRegEn.addEventListener("click", register);
// });
// document.addEventListener("DOMContentLoaded", function() {
//   const btnRegAr = document.querySelector("#btn_register_ar");
//   btnRegAr.addEventListener("click", register);
// });
document.addEventListener("DOMContentLoaded", function() {
  const btnReg = document.querySelector("#btn_register");
  btnReg.addEventListener("click", register);
});

// todos.html
// Add Task Button:
document.addEventListener("DOMContentLoaded", function() {
  const btnAddTask = document.querySelector("#btn_add_task");
  btnAddTask.addEventListener("click", addTask);
});
// Logout Button:
document.addEventListener("DOMContentLoaded", function() {
  const btnLogout = document.querySelector("#btn_logout");
  btnLogout.addEventListener("click", logout);
});


