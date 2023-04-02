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
            }
        })
        }
    })
    card.append(like, catpic, name);
    if (cat.age >=0) {
        const age = document.createElement("span");
        age.innerText = cat.age + " лет";
        card.append(age);
        }
   // card.addEventListener("click", (e) => {
   //     deleteCard(cat.id, card)
   // });    
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
                }
            })
    }
}

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
            for (let c of data) {
            createCard(c, box);
            }
        }
    })

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

