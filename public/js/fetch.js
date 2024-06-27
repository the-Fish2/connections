async function showAGame(event) {
    // console.log(event.currentTarget)
    // console.log(event.currentTarget.textContent)
    const response = await fetch('/pastGames/' + event.currentTarget.textContent)
    const json = await response.json()

    inputDataManager._buildBoard(json.dimensions, json.words, json.answer_key);

}

const generatePastGames = async () => {

    const response = await fetch('/pastGames')
    const json = await response.json()
    const gameTitles = json.gameTitles

    const gamesList = document.querySelector('#pastGamesList')
    for (const item of gameTitles) {
        const newGame = document.createElement('button')
        newGame.appendChild(document.createTextNode(item))
        newGame.addEventListener('click', showAGame)
        
        gamesList.appendChild(newGame)
    }

}

generatePastGames()
