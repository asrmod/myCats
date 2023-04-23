function createCard(cat, el = box) {

    const card = document.createElement("div");
    card.className = "card";


    const catpic = document.createElement("div");
    catpic.className = "catpic";
    if (!cat.image) {
        catpic.classList.add("default");
    } else {
        catpic.style.backgroundImage = `url(${cat.image})`
    }

    const name = document.createElement("h3");
    name.innerText = cat.name;
    
    const like = document.createElement("i");
    like.className = "fa-heart card__like";
    like.classList.add(cat.favorite ? "fa-solid" : "fa-regular");
    like.addEventListener("click", e => {
        e.stopPropagation();
        if (cat.id) {
        fetch(`${path}/update/${cat.id}`, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({favorite: !cat.favorite})
        }) 
        .then(res => {
            if (res.status === 200) {
                like.classList.toggle("fa-solid");
                like.classList.toggle("fa-regular");
                cats = cats.map(c => {
                    if (c.id === cat.id) {
                        c.favorite = !cat.favorite;
                    }
                    return c;
                })
                // localStorage.setItem("cats-data", JSON.stringify(cats));
            }
        })
        }
    })

    const trash = document.createElement("i");
    trash.className = "fa-solid fa-trash card__trash";
    trash.addEventListener("click", e => {
        deleteCard(cat.id, e.currentTarget.parentTarget);
    })

    const edit = document.createElement("i");
    edit.className = "fa-solid fa-pencil card__edit";
    //

    edit.addEventListener("click", e => {
        e.stopPropagation();
        upd.style.display = "flex";
        const idInput = upd.querySelector("input[name=id]");
        if (idInput) {
            idInput.value=cat.id;
        }
        const nameInput = upd.querySelector("input[name=name]");
        if (nameInput) {
            nameInput.value=cat.name;
        }
        const imageInput = upd.querySelector("input[name=image]");
        if (imageInput) {
            imageInput.value=cat.image;
        }
        const favoriteInput = upd.querySelector("input[name=favorite]");
        if (favoriteInput) {
            favoriteInput.value=cat.favorite;
        }
        const descriptionInput = upd.querySelector("input[name=description]");
        if (descriptionInput) {
            descriptionInput.value=cat.description;
        }
    });

    
    editClose.addEventListener("click", e => {
        upd.style = null;
    })

    // // Отправка формы обратной связи c изменениями
const updForm = document.forms.upd;
updForm.addEventListener("submit", e => {
    e.preventDefault();
    const body = {};
    for (let i = 0; i < updForm.elements.length; i++) {
        const inp = updForm.elements[i];
        if (inp.name) {
            if (inp.type === "checkbox") {
                body[inp.name] = inp.checked;
            } else {
                body[inp.name] = inp.value;
            }
        }
    }
    body.id = +body.id;
    console.log("upd", body);

    fetch(`${path}/update/${body.id}`, {
        method: "put",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    })
    .then(res => res.json())
        .then(data => {
            console.log(data);
            if (data.message.includes("успешно")) {
                cats = cats.map(cat => {
                    if (cat.id === body.id) {
                        return body;
                    }
                    return cat;
                })
                console.log(cats);
                box.innerHTML = "";
                cats.forEach(cat => {
                    createCart(cat, box);
                })
                updForm.reset()
                upd.style = null;
            } else {
                return res.json();
            }
        })
       
})

    //

    const more = document.createElement("i");
    more.className = "fa-solid fa-info-circle card__more";
    more.addEventListener("click", e => {
        moreDetailed(cat.id);
    })

    card.append(catpic, like, name, more, edit, trash);
    if (cat.age >=0) {
        const age = document.createElement("span");
        age.innerText = cat.age + " лет";
        card.append(age);
        }

        more.addEventListener("click", e => {
            location.assign(`info.html?id=${cat.id}`)
        })   
        
    el.append(card);
}

function deleteCard(id) {
    if (id) {
        fetch(`${path}/delete/${id}`, {
            method: "delete"
        })
            .then(res => {
                if (res.status === 200) {
                    el.remove();
                    cats = cats.filter(c => c.id !== id) 
                    // localStorage.setItem("cats-data", JSON.stringify(cats));
                }
            })
    }
}

// =>


// let ids = [];
// fetch(path + "/ids")
//     .then(res => res.json())
//     .then(data => {
//         ids = [...data];
//         myCat.id = ids.length ? ids[ids.length - 1] + 1 : 1;
//         // addCat(myCat);
//     })


function addCat(cat) {
    fetch(path + "/add", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(cat)
    })
    .then(res => res.json())
}

if (cats) {
    try {
          cats = JSON.parse(cats);
          for (let cat of cats) {
            createCard(cat, box);
          }
    } catch(e) {
        if (err) {
        cats = null;
    }}
} else {
    fetch(path + "/show")
    .then(function(res) {
        if (res.statusText === "OK") {
            return res.json();
        }
    })
    .then(function(data) {
        //console.log(data);
        if (!data.length) {
          box.innerHTML = "<div class=\"empty\">У вас пока еще нет питомцев</div>"
        } else {
            cats = [...data];
            // localStorage.setItem("cats-data", JSON.stringify(data));
            for (let c of data) {
            createCard(c, box);
            }
        }
    })
}

