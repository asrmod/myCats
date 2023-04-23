const user = "asrmod";
const path = `https://cats.petiteweb.dev/api/single/${user}`;
        
        let id = location.search.split("=");
        id = id[id.length - 1];

        const info = document.querySelector(".info");
        const name = document.querySelector(".name");
        const img = document.querySelector(".img");
        const exit = document.querySelector(".exit");

        fetch(`${path}/show/${id}`)
            .then(res => {
                console.log(res);
                if (res.ok) {
                    return res.json()
                }
            })
            .then(data => {
                console.log(data);
                name.innerHTML = `<h1>${data.name}</h1>`

                info.innerHTML = `<h4>${data.description}</h4>`
                if (!data.description) {
                    info.innerHTML = null
                }

                img.src = `${data.image}`
                if (!data.image) {
                    img.src = "https://cdn-icons-png.flaticon.com/512/252/252208.png"
                }


            })
        exit.addEventListener("click", e => {
            location.assign(`index.html`)
           
        })