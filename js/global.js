let cats;
const box = document.querySelector(".container");
const addBtn = document.querySelector(".add-btn");
const moreBtn = document.querySelector(".more-btn");
const mdBox = document.querySelector(".modal-container");
const moreBox = document.querySelector(".more-container");
const mdClose = mdBox.querySelector(".modal-close");
const upd = document.querySelector(".md-container");
const editClose = document.querySelector(".md-close")
const addForm = document.forms.add;



const user = "asrmod";
// let user = localStorage.getItem("cat12");
// if (!user) {
//     user = prompt("Ваш логин: ", "asrmod");
//     localStorage.setItem("cat12", user);
// }

const path = `https://cats.petiteweb.dev/api/single/${user}`;

// let cats = localStorage.getItem("cats-data");
