    const input = document.querySelector('#input')
    const select = document.getElementById('select')
    const result = document.getElementById('result')
    let options = document.querySelectorAll('option')

    input.addEventListener('focusout', () => {
        select.innerText= ''
        if (input.value.length > 0 ) {

            fetch(`https://api.boardgameatlas.com/api/search?name=${input.value}&limit=10&client_id=fgWueIUlP9&`)
            .then((response) => response.json())
            .then((data)=> {

                select.removeChild
                
                data.games.forEach(game => {
                    let option = document.createElement("option")
                    select.appendChild(option)
                    option.value = game.name
                    option.innerHTML = game.name
                })
            })
        }else{
            select.removeChild
            while (result.firstChild) {
                result.removeChild(result.lastChild)
            }
        }
    })

    select.addEventListener('change', () => {
        fetch(`https://api.boardgameatlas.com/api/search?name=${select.value}&limit=10&client_id=fgWueIUlP9&`)
            .then((response) => response.json())
            .then((data)=> {

                while (result.firstChild) {
                    result.removeChild(result.lastChild)
                }
                console.log(data.games[0]);
                let h1 = document.createElement("h1")
                    result.appendChild(h1)
                h1.innerHTML = data.games[0].name
                
                let div = document.createElement("div")
                result.appendChild(div)
                div.innerHTML = "<img id='image' src="+ data.games[0].image_url +">"
                document.getElementById("image").style.maxWidth = "300px" 

                let div2 = document.createElement("div")
                result.appendChild(div2)
                if (data.games[0].min_players !== data.games[0].max_players){
                    div2.innerHTML = data.games[0].min_players + " à " + data.games[0].max_players + " Joueurs"
                } else {
                    div2.innerHTML = data.games[0].min_players + " Joueur "
                }

                if (data.games[0].description.length > 0){
                    let div3 = document.createElement("div")
                    result.appendChild(div3)
                    div3.innerHTML = "Description: " + data.games[0].description
                }
            })

    })





