async function showAGame(event) {
    // console.log(event.currentTarget)
    // console.log(event.currentTarget.textContent)
    const title = event.currentTarget.textContent
    const response = await fetch('/pastGames/' + title)
    const json = await response.json()

    inputDataManager._buildBoard(json.dimensions, json.words, json.answer_titles, json.answer_key, title);
}


async function saveGame(event) {
    event.preventDefault();

    const inputInfo = {
        dimensions: TILES_PER_ROW,
        words: inputDataManager.words,
        answer_titles: inputDataManager.answer_titles,
        answer_key: inputDataManager.answer_key,
    }

    if (inputInfo.words.length != 0) {

        const fetchOptions = {
            method: 'POST',
            headers: {
                // 'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(inputInfo)
        }

        console.log(fetchOptions)

        await fetch('/saveGame/' + inputDataManager.title, fetchOptions);

        
        const gamesList = document.querySelector('#pastGamesList')
        prepPastGames(gamesList, inputDataManager.title)
    }
}

const prepPastGames = async (gamesList, title) => {
    const newGame = document.createElement('button')
    newGame.appendChild(document.createTextNode(title))
    newGame.addEventListener('click', showAGame)
    gamesList.appendChild(newGame)
}

const generatePastGames = async () => {

    const response = await fetch('/pastGames')
    const json = await response.json()
    const gameTitles = json.gameTitles
    
    const gamesList = document.querySelector('#pastGamesList')
    for (const item of gameTitles) {
        prepPastGames(gamesList, item)
    }  

}

generatePastGames()

const saveGameButton = document.querySelector('#saveGame')
saveGameButton.addEventListener('click', saveGame)
